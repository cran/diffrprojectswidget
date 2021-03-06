HTMLWidgets.widget({

  name: "dp_table",
  type: "output",

  // initialization of drawing area
  initialize:
    function(el, width, height) {

    },

  // doing a resize
  resize:
    function(el, width, height) {

    },


  // doing duty to do
  renderValue:
    function(el, x) {



      // function making one table row
      var table_row = function(i){
        var row_values =
        [
          "[" + x.alignment.alignment_i[i] + "]"  ,
          "<i>" +
            x.text1.substring(
              x.alignment.from_1[i] === null ? null : (x.alignment.from_1[i] -1),
              x.alignment.to_1[i]   === null ? null : (x.alignment.to_1[i] + 1)
            ) +
          "</i>" ,
          x.alignment.token_i_1[i] === null ? null : ("[" + x.alignment.token_i_1[i] + "]"),
          "<i>" + atype(x.alignment.type[i]) + "</i>" ,
          x.alignment.distance[i],
          x.alignment.token_i_2[i] === null ? null : ("[" + x.alignment.token_i_2[i] + "]"),
          "<i>" +
            x.text2.substring(
              x.alignment.from_2[i] === null ? null : (x.alignment.from_2[i] - 1) ,
              x.alignment.to_2[i]   === null ? null : (x.alignment.to_2[i] + 1)
            ) +
          "</i>"
        ];
        for (var j = 0; j < item_number(x.alignment_data_vars); j++) {
          row_values.push(
            x.alignment_data[ Object.keys(x.alignment_data )[j] ][i]
          );
        }
        for (var k = 0; k < item_number(x.alignment_text_data_vars); k++) {
          row_values.push(
            typeof(x.alignment_text_data_vars)==="string" ?
            x.alignment_text1_data[ x.alignment_text_data_vars ][i] :
            x.alignment_text1_data[ x.alignment_text_data_vars[k] ][i]
          );
        }
        for (var q = 0; q < item_number(x.alignment_text_data_vars); q++) {
          row_values.push(
            typeof(x.alignment_text_data_vars)==="string" ?
            x.alignment_text2_data[ x.alignment_text_data_vars ][i] :
            x.alignment_text2_data[ x.alignment_text_data_vars[q] ][i]
          );
        }

        return "<tr class='" + x.alignment.type[i] + "' ><td>"+ row_values.join("</td><td>") + "</td></tr>" ;
      };

      // add table to element
      $(el).append("<table>");
      var table = $(el).find("table");

      // fill table with values
      var table_head = [
          "#" ,
          "token_1",
          "#1",
          "type",
          "distance",
          "#2",
          "token_2"
      ];

      for (var l = 0; l < item_number(x.alignment_data_vars); l++) {
        table_head.push(
          typeof(x.alignment_data_vars)==="string" ?
          x.alignment_data_vars :
          x.alignment_data_vars[l]
        );
      }

      for (var m = 0; m < item_number(x.alignment_text_data_vars); m++) {
        table_head.push(
          typeof(x.alignment_text_data_vars)==="string" ?
          x.alignment_text_data_vars + "_1" :
          x.alignment_text_data_vars[m] + "_1"
        );
      }

      for (var m = 0; m < item_number(x.alignment_text_data_vars); m++) {
        table_head.push(
          typeof(x.alignment_text_data_vars)==="string" ?
          x.alignment_text_data_vars + "_2" :
          x.alignment_text_data_vars[m] + "_2"
        );
      }

      table
        .append(
          "<thead><tr class='firstline'><th>" +
          table_head.join("</th><th>") +
          "</th></tr></thead>"
        )
      ;

      for (o = 0; o < x.alignment.alignment_i.length; o++) {
        table.append( table_row(o) );
      }

      $(document).ready(function() { xdata = x; });

      // add stickyness
      $(document).ready(function() { table.stickyTableHeaders(); });

      // update height of encapsualting div
      $(el).height( table.height()+10 );

    }
});













