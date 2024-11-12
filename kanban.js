const pasteCard = (card) => {
    const swimlanes = document.querySelectorAll('.swimlane');
    const randomSwimlane = Math.floor(Math.random() * swimlanes.length);
    swimlanes[randomSwimlane].appendChild(card);
}

const createCard = (text) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.draggable = 'true';

    // สร้างเนื้อหาหลักของการ์ด
    const cardText = document.createElement('span');
    cardText.innerText = text;

    // สร้างปุ่มลบ
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Finish';
    deleteButton.className = 'finish-button';
    deleteButton.onclick = () => {
        cardElement.remove(); // ลบการ์ดนี้ออกเมื่อคลิกปุ่มลบ
    };

    // เพิ่มเนื้อหาของการ์ดและปุ่มลบลงในการ์ด
    cardElement.appendChild(cardText);
    cardElement.appendChild(deleteButton);

    cardElement.addEventListener('dragstart', (e) => {
        e.target.id = 'dragged';
    });

    cardElement.addEventListener('dragend', (e) => {
        e.target.id = '';
    });

    pasteCard(cardElement);
}

const addEventListenerToSwimlanes = () => {
    const swimlanes = document.querySelectorAll('.swimlane');
    for (let i = 0; i < swimlanes.length; i++) {
        swimlanes[i].addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        swimlanes[i].addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedCard = document.querySelector('#dragged');
            draggedCard.parentNode.removeChild(draggedCard);
            e.currentTarget.appendChild(draggedCard);
        });
    }
}

const addCard = () => {
    const input = document.getElementById('cardInput');
    const text = input.value.trim();

    if (text) {
        createCard(text); // สร้างการ์ดจากข้อความที่ผู้ใช้กรอก
        input.value = ''; // ล้างค่าใน input หลังจากสร้างการ์ด
    } else {
        alert("Please enter text for the card");
    }
}

addEventListenerToSwimlanes();
