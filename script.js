function saveStore() {
    const storeType = document.getElementById('storeType').value;
    const storeName = document.getElementById('storeName').value;
    const storePhone = document.getElementById('storePhone').value;
    const mealName = document.getElementById('mealName').value;
    const storeImage = document.getElementById('storeImage').files[0];
    const deliveryAvailable = document.getElementById('deliveryAvailable').checked ? 'متوفر' : 'غير متوفر';
  
    if (!storeName || !storePhone || !mealName) {
      alert('يرجى إدخال جميع الحقول');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const storeList = document.getElementById('storeList');
      const newStore = document.createElement('li');
      newStore.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'border', 'border-pink-500', 'flex', 'items-center', 'space-x-4', 'relative');
  
      const imgElement = document.createElement('img');
      imgElement.src = event.target.result;
      imgElement.alt = 'صورة الوجبة';
      imgElement.classList.add('h-16', 'w-16', 'rounded-full', 'object-cover');
  
      const textElement = document.createElement('div');
      textElement.innerHTML = `
        <strong>${storeType}</strong>: ${storeName}<br>
        هاتف: ${storePhone}<br>
        الوجبة: ${mealName}<br>
        التوصيل: ${deliveryAvailable}
      `;
      textElement.classList.add('text-gray-700');
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'حذف';
      deleteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-red-500', 'text-white', 'p-1', 'rounded');
      deleteButton.onclick = function() {
        storeList.removeChild(newStore);
      };
  
      newStore.appendChild(imgElement);
      newStore.appendChild(textElement);
      newStore.appendChild(deleteButton);
      storeList.appendChild(newStore);
    };
  
    if (storeImage) {
      reader.readAsDataURL(storeImage);
    }
  
    document.getElementById('restaurantForm').reset();
  }
  
  