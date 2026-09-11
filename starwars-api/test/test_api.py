#!/usr/bin/env python3
"""
Rebel Alliance Intelligence API — Test Suite
Run this after your server is up: python3 test/test_api.py
"""

import urllib.request
import urllib.error
import json
import sys

BASE_URL = "http://localhost:8080"

# NOTE: Update this path to match the endpoint you registered in main.go!
ENDPOINT = "/api/characters"


def call(path):
    """Make a GET request and return (status_code, parsed_body)."""
    try:
        with urllib.request.urlopen(BASE_URL + path) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as e:
        try:
            body = json.loads(e.read())
        except Exception:
            body = {}
        return e.code, body


def check(description, path, expected_status, extra=None):
    status, body = call(path)
    ok = status == expected_status
    marker = "PASS" if ok else "FAIL"
    print(f"  [{marker}] {description} (got {status}, expected {expected_status})")
    if not ok:
        print(f"         Response: {body}")
    if ok and extra:
        extra(body)
    return ok


def has_threat_scores(body):
    if not isinstance(body, list) or len(body) == 0:
        print("         WARNING: response is empty — did you fill in the DB query?")
        return
    for item in body:
        if "threat_score" not in item:
            print(f"         WARNING: missing threat_score on {item.get('name')}")


print("\nRebel Alliance Intelligence API — Test Suite")
print("=" * 48)

results = [
    check(
        "Valid faction: rebel",
        f"{ENDPOINT}?faction=rebel",
        200,
        extra=has_threat_scores,
    ),
    check(
        "Valid faction: empire",
        f"{ENDPOINT}?faction=empire",
        200,
        extra=has_threat_scores,
    ),
    check(
        "Valid faction: jedi",
        f"{ENDPOINT}?faction=jedi",
        200,
        extra=has_threat_scores,
    ),
    check(
        "Invalid faction should return 400",
        f"{ENDPOINT}?faction=hutt",
        400,
    ),
    check(
        "Missing faction param should return 400",
        f"{ENDPOINT}",
        400,
    ),
]

passed = sum(results)
total = len(results)
print(f"\n{passed}/{total} tests passed")
print()
sys.exit(0 if passed == total else 1)
