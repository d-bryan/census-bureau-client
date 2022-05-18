export const config = {
    urls: {
        testing: 'http://localhost:8000/',
        live: 'https://census-bureau-data.herokuapp.com/'
    },
    routes: {
        apportionment: {
            full: {
                route: 'apportionment/',
                paramType: null,
            },
            state: {
                route: 'apportionment/state/',
                paramType: 'state',
            },
            year: {
                route: 'apportionment/year/',
                paramType: 'year',
            },
            popGreater: {
                route: 'apportionment/pop-greater/',
                paramType: 'pop',
            },
            popLess: {
                route: 'apportionment/pop-less/',
                paramType: 'pop',
            },
            repGreater: {
                route: 'apportionment/reps-greater/',
                paramType: 'reps',
            },
            repLess: {
                route: 'apportionment/reps-less/',
                paramType: 'reps',
            },
        },
        itemizedTaxes: {
            full: {
                route: 'itemized-taxes/',
                paramType: null,
            },
            state: {
                route: 'itemized-taxes/state/',
                paramType: 'state',
            },
            year: {
                route: 'itemized-taxes/year/',
                paramType: 'year',
            },
            taxesGreater: {
                route: 'itemized-taxes/taxes-greater/',
                paramType: 'taxes',
            },
            taxesLess: {
                route: 'itemized-taxes/taxes-less/',
                paramType: 'taxes',
            },
        },
        unemploymentCounty: {
            full: {
                route: 'unemployment-county/',
                paramType: 'count-id',
            },
            fullFip: {
                route: 'unemployment-county/total-fip/',
                paramType: 'count-id',
            },
            fip: {
                route: 'unemployment-county/fip/',
                paramType: 'fip',
            },
        }
    }
}
