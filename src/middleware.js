import {indexOf} from "leaflet/src/core/Util";

export function editStateName(stateName) {
    stateName = stateName.replace('-', ' ');
    let words = stateName.split(' ');
    words.forEach((word, index) => {
        words[index] = word.charAt(0).toUpperCase() + word.substring(1);
    })
    stateName = words.join(' ');
    return stateName;
}

export function mapStateName(currentData) {
    currentData = currentData.map((state) => {
        return {
            ...state,
            state: editStateName(state.state),
        }
    });
    return currentData;
}

// const mapEnum = {
//     apportionment: 'apportionment',
//     itemizedTaxes: 'itemizedTaxes',
//     unemployment: 'unemployment',
// }
//
// export const apportionmentMapPolygonColorToDensity = (reps => {
//     return reps > 50
//       ? '#62F59F'
//       : reps > 30
//         ? '#9411F2'
//         : reps > 20
//           ? '#A61C70'
//           : reps > 10
//             ? '#F2119A'
//             : reps > 5
//               ? '#F2D729'
//               : '#40698b';
// })

export function binarySearch(arr, target, start, end) {
    // base
    if (start > end) return false;

    // find middle index
    let mid = Math.floor((start + end) / 2);

    // check if target is at mid
    if (arr[mid] === target) return indexOf(arr, target);

    // if element is at mid or greater, search left
    if (arr[mid] > target) {
        return binarySearch(arr, target, start, mid - 1);
    } else {
        // if element is at mid or less, search right
        return binarySearch(arr, target, mid + 1, end);
    }

}
