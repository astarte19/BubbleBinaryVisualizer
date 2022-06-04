
var container = document.getElementById("items");
var button = document.querySelector("button");
var alert_container = document.getElementById("alert");

//Generate items and labels
function Generator() {
    for (var i = 0; i < 25; i++) {
  
        var value = Math.ceil(Math.random() * 150);
        var item = document.createElement("div");
        item.classList.add("item");
        item.style.height = `50px`;
        item.style.width = `50px`;
        item.style.transform = `translate(${i * 60}px)`;
        var item_text = document.createElement("label");
        item_text.classList.add("item_text");
        item_text.innerText = value;
        item_text.style.background = `none`;
        item.append(item_text);
        container.append(item);
    }
}
  

async function BubbleSort() {
    var items = document.querySelectorAll(".item");
    var alert = document.createElement("h1");
    alert.classList.add("alert");

    
    for (var i = 0; i < items.length; i ++) {
        for (var j = 0; j < items.length - i - 1; j ++) {

            items[j].style.backgroundColor = "#F5FFFA";
            items[j + 1].style.backgroundColor = "#F5FFFA"; 
            var id1 = Number(items[j].childNodes[0].innerHTML);
            var id2 = Number(items[j + 1].childNodes[0].innerHTML);
 
            if (id1 > id2) {
                    alert.innerText = `Current pair: ${id1} > ${id2}`;
                    alert_container.append(alert);

               await new Promise((resolve) => {
                   //replace
                    var temp = items[j].style.transform;
                    items[j].style.transform = items[j + 1].style.transform;
                    items[j + 1].style.transform = temp;
                    window.requestAnimationFrame(function() {
                        //insert and delay
                        setTimeout(()=>{
                            container.insertBefore(items[j + 1], items[j]);
                                resolve();
                        },500);
                    });  
                });

                items = document.querySelectorAll(".item");
            }

            //return base colors
            items[j].style.backgroundColor = "#497E76";
            items[j + 1].style.backgroundColor = "#497E76";
        }

        //set result color
        items[items.length - i - 1].style.backgroundColor = "#54FF9F";
    }

    alert.innerText = "Done.\nTap on the item to visualize Binary Search";
    alert_container.append(alert);
    //get label's text and create ids
    var temp_items = document.querySelectorAll(".item");
    for(var i=0;i<temp_items.length;i++)
    {
        var id = Number(temp_items[i].childNodes[0].innerText);
        temp_items[i].id = id;
    }

    //get id, get item by id, and create event with id
    var result_items = document.querySelectorAll(".item");
    result_items.forEach(element => {
        var index = element.getAttribute("id");
        var result_item = document.getElementById(index);
        
        result_item.addEventListener("click",function(){
            binarySearch(index);
        });
        
    });
}
  



async function binarySearch(index) {
    var binary_array = document.querySelectorAll(".item");
    var alert = document.getElementById("alert");

    //set base color
    for (var i = 0; i < binary_array.length; i += 1) {
        binary_array[i].style.backgroundColor = "#497E76";
    }
   
    
    alert.innerText = `Finding ${index}...`;

    var start = 0;
    var end = 24;
    
    while (start <= end) {
      //get mid
      var middle = Math.floor((start + end) / 2);
      binary_array[middle].style.backgroundColor = "#F5FFFA";
   
      //middle value
      var value = Number(binary_array[middle].childNodes[0].innerHTML);
   
      // delay
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 700)
      );
   
      
      //compare current element with my
      if (value == index) {
        alert.innerText = "Element Found";
        binary_array[middle].style.backgroundColor = "#54FF9F";
        break;
      }
      
      if (value > index) {
        end = middle - 1;
        binary_array[middle].style.backgroundColor = "#497E76";
      } else {
        start = middle + 1;
        binary_array[middle].style.backgroundColor = "#497E76";
      }
    }
    
  }

  button.addEventListener("click", function() {
    Generator();
    BubbleSort();
    button.remove();
  });