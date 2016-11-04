$(document).ready(function(){
 window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var request, db;

    if(!window.indexedDB){
        console.log("Your Browser does not support IndexedDB");
    }
    else{
        request = window.indexedDB.open("testDB", 2);

        request.onerror = function(event){
                        console.log("Error opening DB", event);
        }
        request.onupgradeneeded   = function(event){
                        console.log("Upgrading");
                        db = event.target.result;
                        var objectStore = db.createObjectStore("products", { keyPath : "productId" });
                    };
                    request.onsuccess  = function(event){
                        console.log("Success opening DB");
                        db = event.target.result;
                    }
    }

    $("#addBtn").click(function(){

    var productId = $("#productId").val();
    var shortName = $("#shortName").val();
    var description = $("#description").val();
    var price = $("#price").val();

    var transaction = db.transaction(["products"],"readwrite");

    transaction.oncomplete = function(event) {
        console.log("Success :)");
        $("#result").html("Add : Success");
    };

    transaction.onerror = function(event) {
        console.log("Error :(");
        $("#result").html("Add : Error");
    };

    var objectStore = transaction.objectStore("products");
        var product = {productId: productId, shortName: shortName, description: description, price: price};
        console.log("adding: "+product);
        objectStore.add(product);
    });

    $("#getBtn").click(function(){
        var productId = $("#productId").val();
        console.log("get - onclick: "+productId);
        var request = db.transaction(["products"],"readwrite").objectStore("products").get(productId);
        request.onsuccess = function(event){
                var result = request.result;
                $("#result").html("Name : "+result.shortName + " "+ result.productId);
        };
    });

     $("#removeBtn").click(function(){
        var productId = $("#productId").val();
        db.transaction(["products"],"readwrite").objectStore("products").delete(productId);
     });

    });
