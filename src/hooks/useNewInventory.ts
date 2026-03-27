import { axios_api } from "@/services/axios_api";

 export function addProductToInventory(form: FormData){

    const productData = {
        barCode: form.get('barcode') as string,
        productName: form.get('productName') as string,
        category: form.get('category') as string,
        productPrice: parseFloat(form.get('productPrice') as string),
        expirationDate: form.get('expirationDate') as string,
        quantity: parseInt(form.get('quantity') as string, 10),

    };

    alert(`Produto adicionado:\n\nCódigo de barras: ${productData.barCode}\nNome do Produto: ${productData.productName}\nCategoria: ${productData.category}\nPreço: R$${productData.productPrice.toFixed(2)}\nData de Validade: ${new Date(productData.expirationDate).toLocaleDateString('pt-BR')}\nQuantidade: ${productData.quantity}`);

    // try {
    //    axios_api.post('/inventory', productData)
    //     .then(
    //         response => {
    //             console.log('Produto adicionado com sucesso:', response.data);
    //             alert('Produto adicionado com sucesso!');
    //     })
    // } catch (error){
    //     console.error('Erro ao adicionar produto:', error);
    // }
}