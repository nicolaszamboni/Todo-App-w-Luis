let items = [
  { name: "item1", id: 1, finished: true },
  { name: "item2", id: 2, finished: false },
  { name: "item3", id: 3, finished: true },
  { name: "item4", id: 4, finished: false },
  { name: "item5", id: 5, finished: false },
  { name: "item6", id: 6, finished: false },
];

let itemPai = document.querySelector("#thirdContainer");

const appendItems = (items) => {
  itemPai.innerHTML = "";
  items.forEach((element) => {
    let item = document.createElement("div");
    item.className = "item";

    let divItemCheckbox = document.createElement("div");
    divItemCheckbox.className = "itemCheckbox";

    let label = document.createElement("label");
    label.className = "checklabel";
    label.setAttribute("for", "mycheck");

    let paragraph = document.createElement("p");
    let text = document.createTextNode(element.name);

    let imagem = document.createElement("img");
    imagem.className = "imagem";
    imagem.setAttribute("src", "images/icon-cross.svg");

    let imagemOk = document.createElement("img");
    imagemOk.className = "imagemOk";
    imagemOk.setAttribute("src", "images/icon-check.svg");

    divItemCheckbox.appendChild(imagemOk)
    divItemCheckbox.appendChild(label);
    item.appendChild(divItemCheckbox);
    paragraph.appendChild(text);
    divItemCheckbox.appendChild(paragraph);
    itemPai.appendChild(item);
    item.appendChild(imagem);
    excludeImg();

    if(element.finished){
      label.classList.add('finished')
      divItemCheckbox.classList.add('finished')
      imagemOk.classList.add('finished')
      imagemOk.id = 'visible';
    }
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
<p class='clear'>Clear Completed</p>`;

  itemPai.appendChild(ultimoItem);
};

appendItems(items);

let inputText = document.querySelector(".text");

inputText.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    items.push({
      name: inputText.value,
      id: Math.floor(Math.random() * 1000),
    });
    inputText.value = "";
    appendItems(items);
  }
});

function excludeImg() {
  let inputImg = document.querySelectorAll(".imagem");
  for (let i = 0; i < inputImg.length; i += 1) {
    inputImg[i].addEventListener("click", (event) => {
      for (let o = 0; o < items.length; o += 1) {
        if (inputImg[i].parentNode.innerHTML.includes(items[o].name)) {
          console.log(inputImg[i].parentNode);
          items.splice(o, 1);
          appendItems(items);
        }
      }
    });
  }
}

itemPai.addEventListener('click', (event) => {
  if(event.target.classList[0].includes('checklabel')||event.target.classList[0].includes('imagemOk')){
    // console.log('entrou')
    for(let i = 0; i < event.target.classList.length; i += 1){
      if(event.target.classList[i].includes('finished')){
      console.log('entrou')
        
        items.forEach((item) => {
          if(event.target.parentNode.parentNode.innerHTML.includes(item.name)){
            item.finished = false;
            appendItems(items)
          }
        })
      }else{
        items.forEach((item) => {
          if(event.target.parentNode.parentNode.innerHTML.includes(item.name)){
            item.finished = true;
            appendItems(items)
          }
        })
      }
    }
  }

  if(event.target.classList[0].includes('clear')){
    items = items.filter((item) => {
      return !item.finished 
    })
    appendItems(items)
  }
})