export function formatToReal(number: string){

    let formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL'
    })

    return formatter.format(Number(number))      

} 