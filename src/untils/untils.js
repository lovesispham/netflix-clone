export const dateToYearOnly = date => date.slice(0,4)

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}