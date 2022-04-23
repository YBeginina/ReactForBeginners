
export const isComa = (result: string) => {
    let arrResult = result.split('');
    return arrResult.includes(',');
}

export const disableSymbolButton = (mathSymbol: string) => {
    return mathSymbol !== '';
}
