/**
 * 
 * @param {Array} data
 * @param {Number} pageSize
 * @param {Number} currentPage
 * @description this function will return paginated results based on currentpage 
 */

function paginate(data, pageSize, currentPage) {
    let startIndex = currentPage * pageSize;
    let endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}

/**
 * 
 * @param {Array} data 
 * @param {String} key 
 * @param {String} sortOrder 
 */
function sorting(data, key, sortOrder){
    //boundary condition
    // if(Array.isArray(data)) throw new Error('Invalid data'); 
    let sampleData = data[0];
    // if(!(Object.keys(data).includes(key))) return data;                                    //object.keys() me given key present h ya nhi
    // if(!["asc","desc"].includes(sortOrder)) return data;
    //sorting
    if(typeof sampleData[key] === "number") {
        data.sort((a, b) => {
            a = a[key];
            b = b[key];
            if(sortOrder === "asc") return a-b;
            if(sortOrder === "desc") return b-a;
         });
    }
    else if(typeof sampleData[key] === 'string') {
        data.sort((a,b) => {
            a = a[key].toUpperCase();
            b = b[key].toUpperCase();
            if(sortOrder === "asc") {
                if(a>b) return 1;
                if(a<b) return -1;
                return 0;
            };
            if(sortOrder === "desc") {
                if(a>b) return -1;
                if(a<b) return 1;
                return 0;
            }
        });
    }
    return data;
}

export {paginate, sorting};