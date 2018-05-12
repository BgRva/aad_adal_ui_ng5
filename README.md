Todo UI (angular 5)
===================
This repo is part of the Azure Active Directory (AAD) authentication example and provides a UI project built with angular 5.2 to use the [adal.js](https://github.com/AzureAD/azure-activedirectory-library-for-js) library and other wrapper libraries with the v1 AAD endpoint.

This repo has multiple branches, each of which represent different chapters as authentication and authorization are implemented.  Each step builds upon the previous step.  The README file is different for each step and describes the changes with respect to the previous step.  To proceed through all the steps you will need an Azure subscription.  All samples use the default Azure AD features (i.e. free tier).

This repo is a UI project only and is intended to be used in conjunction with the API projects in another repo:  [BgRva/aad_adal_api_dn_std](https://github.com/BgRva/aad_adal_api_dn_std)

# Step A
No Authentication: this is the project baseline and indented to demonstrate
its behavior.  This UI interacts with two APIs:  a TodoApi and an EventApi, each provides basic CRUD behavior for simple objects.