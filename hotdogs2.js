function calc_receipt() {
    var valid_qty = true;
    n_hotdogs = document.getElementById("hotdogs").value;
    n_fries = document.getElementById("fries").value;
    n_sodas = document.getElementById("sodas").value;

    if (n_hotdogs == 0 && n_fries == 0 && n_sodas == 0) {
        valid_qty = false;
        alert("no items have been ordered");
    }

    localStorage.setItem("hotdog_qty", n_hotdogs);
    localStorage.setItem("fries_qty", n_fries);
    localStorage.setItem("sodas_qty", n_sodas);

    return valid_qty;
}

function display_receipt() {
    h = localStorage.getItem("hotdog_qty");
    f = localStorage.getItem("fries_qty");
    d = localStorage.getItem("sodas_qty");

    document.getElementById("num_hotdogs").innerHTML = h;
    document.getElementById("num_fries").innerHTML = f;
    document.getElementById("num_sodas").innerHTML = d;

    var pr_hotdogs = 3.75;
    var pr_fries = 2.00;
    var pr_sodas = 1.80;

    var tax = 1.0625;
    var special = 0.90;
    
    var subtotal = (h * pr_hotdogs) + (f * pr_fries) + (d *  pr_sodas);
    var discount = "None";


    document.getElementById("subtotal_b").innerHTML = "$" + subtotal.toFixed(2);
   
    if (subtotal >= 20) {
        subtotal *= special;
        discount = "10% off";
    }


    var total = subtotal * tax;

    document.getElementById("discount").innerHTML = discount;
    document.getElementById("subtotal_a").innerHTML = "$" + subtotal.toFixed(2);
    document.getElementById("tax").innerHTML = "6.25%"
    document.getElementById("total").innerHTML = "$" + total.toFixed(2);
   

}

