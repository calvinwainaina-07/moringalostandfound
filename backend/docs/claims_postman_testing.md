# Claims API - Postman Testing Guide

Base URL: `http://127.0.0.1:8000`

## 1. Create Claim
- Method: POST
- URL: `/claims/`
- Body (JSON):
{
  "item_id": 1,
  "message": "This is my lost backpack"
}
- Expected: 201 Created

## 2. Get All Claims
- Method: GET
- URL: `/claims/`
- Optional query params: `?status=pending` or `?my_claims_only=true`

## 3. Get Single Claim
- Method: GET
- URL: `/claims/1`

## 4. Update Claim
- Method: PATCH
- URL: `/claims/1`
- Body:
{
  "status": "cancelled",
  "message": "I found it myself"
}

## 5. Delete Claim
- Method: DELETE
- URL: `/claims/1`
- Expected: 204 No Content