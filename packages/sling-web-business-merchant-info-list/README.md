# Sling Merchant Info List Component

This component renders a list element with the merchant information within.

## Usage

This is how you set the component into the project html structure

```html
    <!--root project index file -->
    <sling-sdk-connect></sling-sdk-connect>

    <!-- component wrapper page location -->
    <sling-merchant-info-list
        stonecode=""
        apitoken="">
    </sling-merchant-info-list>
```

The *stonecode* and *apitoken* atributes are mandatory for the component to make the correct request to the integrated api and populate it with data.
The sibling component *sling-sdk-connect* must be passed in the project root index html file for data management purposes. If the project has multiple business components this must be passed ONLY ONCE.

## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
