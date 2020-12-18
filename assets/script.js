  let id = 0;
        let sku;
        let vendor;
        let item;
        let ourCost;
        let shippingCost;
        let packagingCost;
        let roundedTotalCost;
        let profitPercent;
        let bufferPercent;
        let roundedLowerSP;
        let roundedUpperSP;


        $('.calculator-form').submit(function (e) {
          e.preventDefault();
          id += 1;
          sku = $("#skuNumber").val();
          vendor = $("#vendorName").val();
          item = $("#itemName").val();

          ourCostWhole = parseFloat($("#ourcostDollars").val())
          ourCostDecimal = parseFloat($("#ourcostCents").val() / 100)
          ourCost = ourCostWhole + ourCostDecimal

          shippingWhole = parseFloat($("#ourShippingDollars").val())
          ourCostDecimal = parseFloat($("#ourShippingCents").val() / 100)
          shippingCost = shippingWhole + ourCostDecimal

          packagingCostWhole = parseFloat($("#packagingCostDollars").val())
          packagingCostDecimal = parseFloat($("#packagingCostCents").val() / 100)
          packagingCost = packagingCostWhole + packagingCostDecimal;

          totalCost = ourCost + shippingCost + packagingCost
          roundedTotalCost = (totalCost).toFixed(2);


          profitPercentWhole = parseFloat($("#profitMarginPercentWhole").val())
          profitPercentDecimal = parseFloat($("#profitMarginPercentDecimal").val() / 100)
          profitPercent = profitPercentWhole + profitPercentDecimal

          lowerSellPrice = totalCost + ((profitPercent / 100) * totalCost);
          roundedLowerSP = (lowerSellPrice).toFixed(2);


          bufferPercentWhole = parseFloat($("#bufferWhole").val())
          bufferPercentDecimal = parseFloat($("#bufferDecimal").val() / 100)
          bufferPercent = bufferPercentWhole + bufferPercentDecimal;

          uppersellPrice = lowerSellPrice + ((bufferPercent / 100) * totalCost)
          roundedUpperSP = (uppersellPrice).toFixed(2);


          let RounderUpperSale = (uppersellPrice).toFixed(2);

          $("#sellPrice").val(RounderUpperSale);
        });


        // Reset table when reset button is clicked
        $(".resetTable").click(function () {
          $('.calculator-form').trigger("reset");

          $("#table > tbody").empty();
          id = 0;
          sku = null;
          vendor = null;
          item = null;
          ourCost = null;
          shippingCost = null;
          packagingCost = null;
          roundedTotalCost = null;
          profitPercent = null;
          bufferPercent = null;
          roundedLowerSP = null;
          roundedUpperSP = null;
        });





        // Code to print table when print button is clicked
        function printDiv() {
          var divToPrint = document.getElementById('table');
          var htmlToPrint = '' +
            '<style type="text/css">' +
            'table th, table td {' +
            'border-right:1px solid lightgray; border-bottom: 1px solid lightgray; font-family: Arial; font-size: 10px;padding: 8px;' +
            '}' +
            '</style>';
          htmlToPrint += divToPrint.outerHTML;
          newWin = window.open("");
          newWin.document.write(htmlToPrint);
          newWin.print();
          newWin.close();
        }




        // Add record to the table when add button is clicked
        jQuery(document).delegate('a.add-record', 'click', function (e) {
          e.preventDefault();
          if (roundedUpperSP === undefined || roundedUpperSP === null) {
            return false
          } else {

            $("#tbl_posts_body")
              .append($('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + sku + '</td>' +
                '<td>' + vendor + '</td>' +
                '<td>' + item + '</td>' +
                '<td>' + ourCost + '</td>' +
                '<td>' + shippingCost + '</td>' +
                '<td>' + packagingCost + '</td>' +
                '<td>' + roundedTotalCost + '</td>' +
                '<td>' + profitPercent + '</td>' +
                '<td>' + bufferPercent + '</td>' +
                '<td>' + roundedLowerSP + '</td>' +
                '<td>' + roundedUpperSP + '</td>' +
                '<td>' + '<a class="delete-record" id=' + id + '>' + "Del" + '</a>' + '</td>' +

                '</tr>'));
          }
        });

        // Delete table row when Del button is clicked
        jQuery(document).delegate('a.delete-record', 'click', function (e) {
          e.preventDefault();
          var didConfirm = confirm("Are you sure You want to delete ");
          if (didConfirm == true) {

            var rowId = $(this).attr('id');
            $("#" + rowId).remove();

          } else {
            return false;
          }
        });
