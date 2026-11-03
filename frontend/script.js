const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const clientes = JSON.parse(localStorage.getItem("clientes")) || []
const dados4 = document.getElementById('lista-cliente');

const nome3 = document.getElementById('nome3')

const produtoa = document.getElementById('produtoa')
const quantidadea = document.getElementById('quantidadea')
const compras = JSON.parse(localStorage.getItem("compras")) || []
const dadosa = document.getElementById('lista-compra')

const nomep = document.getElementById('nomep');
const preco = document.getElementById('preco');
const quantidade = document.getElementById('quantidade');
const produtos = JSON.parse(localStorage.getItem("produtos")) || []
const dados2 = document.getElementById('lista-estoque')

const dados5 = document.getElementById('listar')
const dados6 = document.getElementById('sla')
const dados7 = document.getElementById('sla2')
const dados8 = document.getElementById('sla3')
const cpf2 = document.getElementById('cpf2');
const produto = document.getElementById('produto');
const vendas = JSON.parse(localStorage.getItem("vendas")) || []
const quantidade2 = document.getElementById("quantidade2")
const dados = document.getElementById('lista-venda');

const cpf3 = document.getElementById('cpf3');
const dados3 = document.getElementById('lista-cliente2');

function cadastrarc() {
    if (nome.value.trim() && cpf.value.trim()) {
        if (/^[A-Za-z\sÀ-ý]+$/.test(nome.value)) {
            if (/^\d{11}$/.test(cpf.value)) {
                let achou = false;
                for (let i of clientes) {
                    if (i.cpf == cpf.value) {
                        achou = true;
                        alert(`Este cliente já está cadastrado!`)
                    }
                }
                if (!achou) {
                    const cliente = {
                        nome: nome.value,
                        cpf: cpf.value
                    }
                    clientes.push(cliente)
                    localStorage.setItem("clientes", JSON.stringify(clientes))
                    alert(cliente.nome + " esta cadastrado(a).")
                    listarc();
                }
            } else {
                alert(`O CPF deve conter somente 11 digítos e somente números!`)
            }
        } else {
            alert(`O nome só pode conter letras, espaços e acentos!`)
        }
    } else {
        alert(`Nome e CPF não podem ser vazios!`)
    }
}

function cadastrarp() {
    if (nomep.value.trim() && preco.value.trim() && quantidade.value.trim()) {
        if (/^\d+$/.test(quantidade.value) && !quantidade.value.includes("e") && !quantidade.value.includes("E")) {
            if (!preco.value.includes("e") && !preco.value.includes("E") && preco.value > -1) {
                let achou = false;
                for (let i of produtos) {
                    if (i.nomep == nomep.value.trim()) {
                        achou = true;
                        alert(`Este produto já está cadastrado!`)
                    }
                }
                if (!achou) {
                    const produto = {
                        nomep: nomep.value,
                        preco: preco.value,
                        quantidade: quantidade.value
                    }
                    produtos.push(produto)
                    localStorage.setItem("produtos", JSON.stringify(produtos))
                    alert(produto.nomep + " esta cadastrado(a).")
                    listare();
                }
            } else {
                alert("O preço deve conter somente números e ser positivo!")
            }
        } else {
            alert(`A quantidade deve conter somente números e ser positiva!`)
        }
    } else {
        alert(`Nome, preco e quantidade não podem ser vazios!`)
    }
}

function cadastrarv() {
    let i = -1;
    let cliente = false;
    for (let c of clientes) {
        if (c.cpf == cpf2.value) {
            cliente = true;
            break;
        }
    }

    if (!cliente) {
        alert("Este produto ou cliente não está cadastrado!");
        return;
    }

    let sla = false;
    let indiceProduto = -1;
    for (let p of produtos) {
        i++;
        if (p.nomep.toUpperCase() == produto.value.trim().toUpperCase()) {
            sla = true;
            indiceProduto = i;
            break;
        }
    }

    if (!sla) {
        alert("Este produto ou cliente não está cadastrado!");
        return;
    }

    if (Number(quantidade2.value) <= 0) {
        alert("Deve se vender pelo menos um produto!");
        return;
    }

    if (produtos[indiceProduto].quantidade < Number(quantidade2.value)) {
        alert("Este produto não tem estoque!");
        return;
    }

    produtos[indiceProduto].quantidade = Number(produtos[indiceProduto].quantidade) - Number(quantidade2.value);

    const venda = {
        cpf2: cpf2.value,
        produto: produto.value,
        quantidade2: quantidade2.value
    };

    vendas.push(venda);
    localStorage.setItem("vendas", JSON.stringify(vendas));
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("A venda do produto " + venda.produto + " foi cadastrada.");
    listarv();
}


function cadastrarco() {
    let i = -1;
    let sla = false;
    let indiceProduto = -1;
    for (let p of produtos) {
        i++;
        if (p.nomep.toUpperCase() == produtoa.value.trim().toUpperCase()) {
            sla = true;
            indiceProduto = i;
            break;
        }
    } if (sla) {
        if (Number(quantidadea.value) > 0) {
            produtos[indiceProduto].quantidade = Number(produtos[indiceProduto].quantidade) + Number(quantidadea.value);
            const compra = {
                produtoa: produtoa.value,
                quantidadea: quantidadea.value
            }
            compras.push(compra)
            localStorage.setItem("compras", JSON.stringify(compras))
            localStorage.setItem("produtos", JSON.stringify(produtos))
            alert("A compra do produto " + compra.produtoa + " foi cadastrada.")
            listarco();
            return;
        } else {
            alert(`Deve ser adicionado pelo menos um produto!`)
            return;
        }
    } else {
        alert(`Este produto não está cadastrado!`)
    }
}



function buscar() {
    let sla = null;
    for (let c of clientes) {
        if (c.cpf === cpf3.value) {
            sla = c;
            break;
        }
    }
    if (sla) {
        dados3.innerHTML += `<p>${sla.nome}</p>`;
    } else {
        alert("Cliente não encontrado!");
    }
}

function excluir() {
    let sla = false;
    let i = -1;
    for (let c of clientes) {
        i++;
        if (c.cpf === cpf3.value) {
            sla = true;
            break;
        }
    }
    if (sla) {
        clientes.splice(i, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes))
        alert("Cliente excluído com sucesso!")
        dados3.innerHTML = "";
        cpf3.value = "";
        return;
    } else {
        alert("Cliente não encontrado!");
    }
}

function editar() {
    let sla = null;
    let i = -1;
    for (let c of clientes) {
        i++;
        if (c.cpf === cpf3.value) {
            sla = c;
            break;
        }
    }
    if (sla) {
        if (nome3.value.trim()) {
            if (/^[A-Za-z\sÀ-ý]+$/.test(nome3.value)) {
                clientes[i].nome = nome3.value;
                localStorage.setItem("clientes", JSON.stringify(clientes))
                alert("Operação bem-sucedida!");
            } else {
                alert(`O nome só pode conter letras, espaços e acentos!`)
            }
        } else {
            alert("O novo nome não pode ser vazio!");
        }
    } else {
        alert("Cliente não encontrado!");
    }
}

function listarv() {
    dados.innerHTML = "Cadastrados:"
    for (let venda of vendas) {
        dados.innerHTML += `<p>CPF: ${venda.cpf2} | Nome do produto: ${venda.produto} | Quantidade vendida: ${venda.quantidade2}</p>`
    }
}

function listarco() {
    dadosa.innerHTML = "Cadastrados:"
    for (let compra of compras) {
        dadosa.innerHTML += `<p>Nome do produto: ${compra.produtoa} | Quantidade comprada: ${compra.quantidadea}</p>`
    }
}

function listare() {
    dados2.innerHTML = "Cadastrados:"
    for (let produto of produtos) {
        dados2.innerHTML += `<p>Nome: ${produto.nomep} | Preço: ${produto.preco} | Quantidade: ${produto.quantidade}</p>`
    }
}

function listarc() {
    dados4.innerHTML = "Cadastrados:"
    for (let cliente of clientes) {
        dados4.innerHTML += `<p>Nome: ${cliente.nome} | CPF: ${cliente.cpf} </p>`
    }
}

function listart() {
    dados5.innerHTML += "Clientes:";
    for (let cliente of clientes) {
        dados5.innerHTML += `<p>Nome: ${cliente.nome} | CPF: ${cliente.cpf} </p>`;
    }

    dados6.innerHTML += "Vendas:";
    for (let venda of vendas) {
        dados6.innerHTML += `<p>CPF: ${venda.cpf2} | Nome do produto: ${venda.produto} | Quantidade vendida: ${venda.quantidade2}</p>`;
    }

    dados7.innerHTML += "Estoque:";
    for (let produto of produtos) {
        dados7.innerHTML += `<p>Nome: ${produto.nomep} | Preço: ${produto.preco} | Quantidade: ${produto.quantidade}</p>`;
    }
    dados8.innerHTML += "Compras:";
    for (let compra of compras) {
        dados8.innerHTML += `<p>Nome do produto: ${compra.produtoa} | Quantidade comprada: ${compra.quantidadea}</p>`
    }
}

function limpar() {
    dados5.innerHTML = "";
    dados6.innerHTML = "";
    dados7.innerHTML = "";
}

function listar() {
    if (dados4) {
        listarc();
    }
    if (dados) {
        listarv();
    }
    if (dados2) {
        listare();
    }
    if (dados5) {
        listart();
    }
    if (dadosa) {
        listarco();
    }
}
listar();