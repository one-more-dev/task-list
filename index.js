const textBox = document.getElementsByTagName("input")[0];
const addButton = document.getElementsByClassName("addButton")[0];
const itemsList = document.getElementsByClassName("items")[0];



function addItem(item=textBox.value,striked=false){
	const novoItem = document.createElement("div");
	novoItem.className = "addedItem";
	novoItem.innerHTML = `${item.trim()}`;

	const deleteButton = document.createElement("button");
	deleteButton.className = "deleteButton";
	deleteButton.innerHTML = `<img src="deleteIcon">`;

	itemsList.appendChild(novoItem);
	novoItem.appendChild(deleteButton);

	deleteItem(novoItem,deleteButton);
	strikeItem(novoItem);
	if(striked){
		novoItem.style.textDecoration = "line-through";
	}
	updateStorage();
}


function strikeItem(eventTarget){
	eventTarget.addEventListener("click",()=>{
		if(event.target.style.textDecoration !== "line-through"){
			event.target.style.textDecoration = "line-through"
		}else{
			event.target.style.textDecoration = "none";
		}
		updateStorage();
	})
}


function deleteItem(eventTarget,eventSon){
	eventTarget.addEventListener("mouseover", ()=>{ eventSon.style.display = "inline-block" });
	eventTarget.addEventListener("mouseout", ()=>{ eventSon.style.display = "none" });
	eventSon.addEventListener("click",()=>{ eventTarget.remove() });
}


function updateStorage(){
	const items = itemsList.childNodes;

	const itemsOnLocalStorage = [...items].map((i) => {
		const itemContent = i.firstChild;
		const strikedItem = i.style.textDecoration == "line-through";
		return { description: i.innerText, strikedItem };
	});
	localStorage.setItem("items", JSON.stringify(itemsOnLocalStorage));
}


function readStorage(){
	const storedItems = JSON.parse(localStorage.getItem("items"));
	if(!storedItems){ return }

	for(item of storedItems){
		addItem(item.description,item.strikedItem);
	}
}


readStorage();

addButton.addEventListener("click", ()=>{
	if(textBox.value.length >0){
		addItem();
	}else{
		textBox.placeholder = "No empty values, please";
	}
	textBox.value = "";
})