# Criar Region

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/region/**
2. ✅ Valida dados obrigatórios **usuário**, **nome da região**, **conjunto de coordenadas**
3. ✅ Retorna **200** com os dados da região criada

> ## Exceções

1. ❌ Retorna erro **403** se a região já tiver dono.
2. ❌ Retorna erro **400** se **usuário**, **nome da região**, **conjunto de coordenadas** não forem fornecidos
3. ❌ Retorna erro **500** se der erro ao tentar criar a o usuário
