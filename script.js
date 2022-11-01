let items = [
  { name: "item1", id: 1 },
  { name: "item2", id: 2 },
  { name: "item3", id: 3 },
  { name: "item4", id: 4 },
  { name: "item5", id: 5 },
  { name: "item6", id: 6 },
];

let itemPai = document.querySelector("#thirdContainer");

const appendItems = (items) => {
    itemPai.innerHTML = ''
  items.forEach((element) => {
    let item = document.createElement("div");
    item.className = "item";

    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.className = "mycheck";

    let label = document.createElement("label");
    label.className = "checklabel";
    label.setAttribute("for", "mycheck");

    let paragraph = document.createElement("p");
    let text = document.createTextNode(element.name);

    item.appendChild(inputCheckbox);
    item.appendChild(label);
    paragraph.appendChild(text);
    item.appendChild(paragraph);
    itemPai.appendChild(item);
  });

let ultimoItem = document.createElement("div");
ultimoItem.id = "ultimoItem";

ultimoItem.innerHTML = ` 
<p>${items.length} itens left</p>
<div id="filterContainer">
  <p>All</p>
  <p>Active</p>
  <p>Completed</p>
</div>
<p>Clear Completed</p>`

itemPai.appendChild(ultimoItem)
};


appendItems(items);

let inputText = document.querySelector('.text')

inputText.addEventListener('keypress' ,(event)=> {
    if(event.key == "Enter"){
        items.push({
            name: inputText.value,
            id : Math.floor(Math.random() * 1000)
        })
        inputText.value = ''
        appendItems(items);
    }
})


