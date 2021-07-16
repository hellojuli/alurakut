import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'ef93935803b807f13a7e01e28f0ed8';
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "967651", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/hellojuli.png",
            // creatorSlug: "hellojuli"
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
} 