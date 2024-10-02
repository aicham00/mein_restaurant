// scripts.js
// حفظ المتجر في localStorage وعرضه
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
    const storeData = {
      storeType,
      storeName,
      storePhone,
      mealName,
      imageSrc: event.target.result,
      deliveryAvailable,
    };

    // تخزين البيانات في localStorage
    const stores = JSON.parse(localStorage.getItem('stores')) || [];
    stores.push(storeData);
    localStorage.setItem('stores', JSON.stringify(stores));

    displayStores(); // عرض المتاجر
  };

  if (storeImage) {
    reader.readAsDataURL(storeImage);
  }

  document.getElementById('restaurantForm').reset();
}

// عرض المتاجر المخزنة
function displayStores() {
  const storeList = document.getElementById('storeList');
  storeList.innerHTML = '';

  const stores = JSON.parse(localStorage.getItem('stores')) || [];
  stores.forEach((store, index) => {
    const newStore = document.createElement('li');
    newStore.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'border', 'border-pink-500', 'flex', 'items-center', 'space-x-4');

    const imgElement = document.createElement('img');
    imgElement.src = store.imageSrc;
    imgElement.alt = 'صورة الوجبة';
    imgElement.classList.add('h-16', 'w-16', 'rounded-full', 'object-cover');

    const textElement = document.createElement('div');
    textElement.innerHTML = `
      <strong>${store.storeType}</strong>: ${store.storeName}<br>
      هاتف: ${store.storePhone}<br>
      الوجبة: ${store.mealName}<br>
      التوصيل: ${store.deliveryAvailable}
    `;
    textElement.classList.add('text-gray-700');

    // زر حذف المتجر
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.classList.add('bg-red-500', 'text-white', 'p-1', 'rounded');
    deleteButton.onclick = function() {
      deleteStore(index);
    };

    newStore.appendChild(imgElement);
    newStore.appendChild(textElement);
    newStore.appendChild(deleteButton);
    storeList.appendChild(newStore);
  });
}

// حذف المتجر من localStorage
function deleteStore(index) {
  const stores = JSON.parse(localStorage.getItem('stores')) || [];
  stores.splice(index, 1);
  localStorage.setItem('stores', JSON.stringify(stores));
  displayStores();
}

// عرض المتاجر عند تحميل الصفحة
window.onload = displayStores;

