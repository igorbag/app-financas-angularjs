angular.module("gerenciadorFinanceiro").controller("gerenciadorFinanceiroCtrl", function ($scope) {
    $scope.app = "Sistema de Gerenciamento Financeiro";
    $scope.controleFinanceiro = [];
    $scope.reverse = true;

    // Acao responsavel por abrir o modal para adicionar itens na lista
    $scope.openModalForAddItem = function () {
        var dialog = document.querySelector('dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
        });

    };

    //Acao responsavel para adicionar o item na lista
    $scope.addItemControleFinanceiro = function () {
        $scope.controleFinanceiro.push({
            descricao: $scope.descricao,
            tipo: $scope.tipo,
            valor: $scope.valor.replace(",", ".")
        });
        clearForm();
        closeModal('dialog');
        getMensagem("Item adicionado com sucesso");
    };

    // Acao responsavel por abrir o modal de remover item
    $scope.openModalRemoveItem = function (intIdItem) {
        var dialog = document.querySelector('#dialogRemove');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
        });
        angular.element(document.querySelector('#idHidden')).val(intIdItem);
    };

    //Acao responsavel por remover o item da lista quando confirmar no modal
    $scope.removeItem = function () {
        var idItem = angular.element(document.querySelector('#idHidden')).val();
        $scope.controleFinanceiro.splice(idItem, 1);
        closeModal('#dialogRemove');
        getMensagem("Item removido com sucesso");
    };

    //Acao responsavel por limpar o formulario depois de adicionar
    var clearForm = function () {
        $scope.descricao = "";
        $scope.valor = "";
    };

    //Acao responsavel por setar o foco no primeiro campo de texto do formulario
    var closeModal = function (strClass) {
        document.querySelector(strClass).close();
    };


    //Acao Responsavel por retornar o total geral de todos os itens adicionados na aplicação
    $scope.getTotal = function () {
        var floTotal = 0;
        var arrayLength = $scope.controleFinanceiro.length;
        for (var i = 0; i < arrayLength; i++) {
            var floValor = parseFloat($scope.controleFinanceiro[i].valor);
            if ($scope.controleFinanceiro[i].tipo == "Saque") {
                floTotal -= (floValor);
            } else {
                floTotal += (floValor);
            }

        }
        return floTotal;
    };

    //Acao Responsavel por retornar o total sacado
    $scope.getTotalSacado = function () {
        var floTotal = 0;
        var arrayLength = $scope.controleFinanceiro.length;
        for (var i = 0; i < arrayLength; i++) {
            var floValor = parseFloat($scope.controleFinanceiro[i].valor);
            if ($scope.controleFinanceiro[i].tipo == "Saque") {
                floTotal += (floValor);
            }
        }
        return floTotal;
    };

    //Acao Responsavel por retornar o total depositado
    $scope.getTotalDepositado = function () {
        var floTotal = 0;
        var arrayLength = $scope.controleFinanceiro.length;
        for (var i = 0; i < arrayLength; i++) {
            var floValor = parseFloat($scope.controleFinanceiro[i].valor);
            if ($scope.controleFinanceiro[i].tipo == "Depósito") {
                floTotal += (floValor);
            }
        }
        return floTotal;
    };

    //Acao responsavel por mostrar a mensagem toast no sistema
    var getMensagem = function (strMsg) {
        var snackbarContainer = document.querySelector('#mensagem');
        var data = {message: strMsg};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    };


    //Acao responsavel por ordenar pelas colunas da grid
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
});