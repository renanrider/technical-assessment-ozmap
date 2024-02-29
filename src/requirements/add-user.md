# Criar Usuário

> ## Caso de usuário

1. ✔️ Recebe uma requisição do tipo **POST** na rota **/api/users**
2. ✔️ Valida dados obrigatórios **name**, **answers**, **email**, **address**, **coordinates**. Só deve ser aceito **address** ou **coordinates**
3. ✔️ **Cria** um usuário com os dados fornecidos
4. ✔️ Retorna **200**, com o usuário criado

> ## Exceções

1. ❌ Retorna erro **400** se **address** ou **coordinates** não forem fornecidos ou ambos forem fornecidos
2. ❌ Retorna erro **500** se der erro ao tentar criar a o usuário
