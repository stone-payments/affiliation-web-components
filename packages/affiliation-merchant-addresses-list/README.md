# Sling Merchant Addresses Business Card Component.

This component renders a card element with the merchant contacts information within. It uses both card and list basic components as content wrappers.

## Usage

This is how you set the component into the project html structure

```HTML
    <!--root project index file -->
    <sling-sdk-connect></sling-sdk-connect>

    <!-- component wrapper page location -->
    <sling-merchant-addresses-list
      stonecode=""
      apitoken="">
    </sling-merchant-addresses-list>
```

The *stonecode* and *apitoken* atributes are mandatory for the component to make the correct request to the integrated api and populate it with data.
The sibling component *sling-sdk-connect* must be passed in the project root index html file for data management purposes. If the project has multiple business components this must be passed ONLY ONCE.

## Project Wiki:

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
