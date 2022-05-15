export const config = {
    urls: {
        testing: 'http://localhost:8000/',
        live: 'census-bureau-data.herokuapp.com/'
    },
    routes: {
        apportionment: {
            full: {
                route: 'apportionment/',
                paramType: null,
            },
            state: {
                route: 'state/',
                paramType: 'state',
            },
            year: {
                route: 'year/',
                paramType: 'year',
            },
            popGreater: {
                route: 'pop-greater/',
                paramType: 'pop',
            },
            popLess: {
                route: 'pop-less/',
                paramType: 'pop',
            },
            repGreater: {
                route: 'reps-greater/',
                paramType: 'reps',
            },
            repLess: {
                route: 'reps-less/',
                paramType: 'reps',
            },
        },
        itemizedTaxes: {
            full: {
                route: 'itemized-taxes/',
                paramType: null,
            },
            state: {
                route: 'state/',
                paramType: 'state',
            },
            year: {
                route: 'year/',
                paramType: 'year',
            },
            taxesGreater: {
                route: 'taxes-greater/',
                paramType: 'taxes',
            },
            taxesLess: {
                route: 'taxes-less/',
                paramType: 'taxes',
            },
        },
        unemploymentCounty: {
            full: {
                route: 'unemployment-county/',
                paramType: 'count-id',
            },
            fullFip: {
                route: 'total-fip/',
                paramType: 'count-id',
            },
            fip: {
                route: 'fip/',
                paramType: 'fip',
            },
        }
    }
}
