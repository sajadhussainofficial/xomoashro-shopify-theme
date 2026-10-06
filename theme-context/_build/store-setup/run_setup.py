#!/usr/bin/env python3
"""Creates the Xomoashro data model in the Shopify store and saves store facts.

Run from the repository root, only after the owner has approved it:

    shopify store auth --store <store> --scopes read_products,write_products,read_metaobject_definitions,write_metaobject_definitions,read_metaobjects,write_metaobjects
    python3 theme-context/_build/store-setup/run_setup.py

What it does, in order:
  1. Reads the shop ID.
  2. Creates each field definition in metafield-definitions.json. Definitions that
     already exist are reported and left unchanged, so it is safe to run again.
  3. Creates the lab_report metaobject definition (skipped if it exists).
  4. Saves every non-empty value in shop-metafield-values.json to the shop.
  5. Reads everything back into read-back-result.json.
"""
import json
import subprocess
import sys
from pathlib import Path

STORE = "https-xomoashro-com-fcrv98st.myshopify.com"
HERE = Path(__file__).resolve().parent
TYPES = {}


def execute(query_file, variables=None, mutation=False):
    cmd = ["shopify", "store", "execute", "--store", STORE, "--json", "--query-file", str(HERE / query_file)]
    if variables is not None:
        cmd += ["--variables", json.dumps(variables)]
    if mutation:
        cmd.append("--allow-mutations")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"Command failed for {query_file}:\n{result.stderr or result.stdout}")
    data = json.loads(result.stdout)
    return data.get("data", data)


def main():
    shop = execute("shop-id.graphql")["shop"]
    print(f"Store: {shop['name']} ({shop['id']}), currency {shop['currencyCode']}")

    definitions = json.loads((HERE / "metafield-definitions.json").read_text())
    for definition in definitions:
        TYPES[(definition["ownerType"], definition["key"])] = definition["type"]
        payload = execute("metafield-definition-create.graphql", {"definition": definition}, mutation=True)
        res = payload["metafieldDefinitionCreate"]
        label = f"{definition['ownerType'].lower()}.custom.{definition['key']}"
        if res["createdDefinition"]:
            print(f"  created  {label}")
        elif any(e.get("code") == "TAKEN" for e in res["userErrors"]):
            print(f"  exists   {label}")
        else:
            print(f"  FAILED   {label}: {res['userErrors']}")

    lab = json.loads((HERE / "lab-report-definition.json").read_text())
    res = execute("metaobject-definition-create.graphql", lab, mutation=True)["metaobjectDefinitionCreate"]
    if res["metaobjectDefinition"]:
        print("  created  metaobject lab_report")
    elif any(e.get("code") == "TAKEN" for e in res["userErrors"]):
        print("  exists   metaobject lab_report")
    else:
        print(f"  FAILED   metaobject lab_report: {res['userErrors']}")

    values = json.loads((HERE / "shop-metafield-values.json").read_text())
    metafields = [
        {"ownerId": shop["id"], "namespace": "custom", "key": key, "type": TYPES[("SHOP", key)], "value": str(value)}
        for key, value in values.items()
        if not key.startswith("_") and value not in (None, "")
    ]
    if metafields:
        res = execute("shop-metafields-set.graphql", {"metafields": metafields}, mutation=True)["metafieldsSet"]
        for m in res["metafields"] or []:
            print(f"  saved    shop.custom.{m['key']} = {m['value']}")
        for e in res["userErrors"]:
            print(f"  FAILED   {e}")

    readback = execute("read-back.graphql")
    (HERE / "read-back-result.json").write_text(json.dumps(readback, indent=2) + "\n")
    print("Read-back saved to read-back-result.json")


if __name__ == "__main__":
    main()
