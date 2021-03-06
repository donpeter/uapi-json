module.exports = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <air:AvailabilitySearchReq
            AuthorizedBy="user" TraceId="{{requestId}}" TargetBranch="{{TargetBranch}}"
            SolutionResult="true"
            ReturnBrandedFares="true"
            xmlns:air="http://www.travelport.com/schema/air_v36_0"
            xmlns:com="http://www.travelport.com/schema/common_v36_0"
            >
            <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
            {{#if emulatePcc}}
                <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
            {{/if}}
            {{#nextResultReference}}
                <com:NextResultReference ProviderCode="1G" >
                    {{nextResultReference}}
                </com:NextResultReference>
            {{/nextResultReference}}
            {{#legs}}
            <air:SearchAirLeg>
                <air:SearchOrigin>
                    <com:CityOrAirport Code="{{from}}" PreferCity="true"/>
                </air:SearchOrigin>
                <air:SearchDestination>
                    <com:CityOrAirport Code="{{to}}" PreferCity="true"/>
                </air:SearchDestination>
                <air:SearchDepTime PreferredTime="{{departureDate}}"/>
                <air:AirLegModifiers>
                    {{#if ../cabins}}
                    <air:PreferredCabins>
                        {{#each ../cabins}}
                        <com:CabinClass Type="{{this}}"/>
                        {{/each}}
                    </air:PreferredCabins>
                    {{/if}}
                </air:AirLegModifiers>
            </air:SearchAirLeg>
            {{/legs}}
            <air:AirSearchModifiers
                {{#if maxJourneyTime}}
                    MaxJourneyTime="{{maxJourneyTime}}"
                {{/if}}
                IncludeFlightDetails="true"
            >
                <air:PreferredProviders>
                    <com:Provider Code="1G" xmlns:com="http://www.travelport.com/schema/common_v36_0"/>
                </air:PreferredProviders>
                {{#if carriers}}
                <air:PermittedCarriers>
                    {{#carriers}}
                    <com:Carrier Code="{{.}}" xmlns:com="http://www.travelport.com/schema/common_v36_0"/>
                    {{/carriers}}
                </air:PermittedCarriers>
                {{/if}}

            </air:AirSearchModifiers>
            {{#if priсing}}
            <air:AirPricingModifiers
                {{#if pricing.currency}}
                CurrencyType="{{pricing.currency}}"
                {{/if}}

                {{#if pricing.eTicketability}}
                ETicketability="{{pricing.eTicketability}}"
                {{/if}}
            />
            {{/if}}
            {{#passengers}}
                <com:SearchPassenger Code="{{ageCategory}}"{{#if child}} Age="9"{{/if}} xmlns:com="http://www.travelport.com/schema/common_v36_0"/>
            {{/passengers}}

        </air:AvailabilitySearchReq>
    </soap:Body>
</soap:Envelope>
`;
