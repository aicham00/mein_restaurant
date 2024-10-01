function saveStore() {
  const storeType = document.getElementById('storeType').value;
  const storeName = document.getElementById('storeName').value;
  const storePhone = document.getElementById('storePhone').value;
  const mealName = document.getElementById('mealName').value;
  const storeImage = document.getElementById('storeImage').files[0];
  const deliveryAvailable = document.getElementById('deliveryAvailable').checked ? 'متوفر' : 'غير متوفر';

  // التحقق من عدم ترك الحقول فارغة
  if (!storeName || !storePhone || !mealName) {
    alert('يرجى إدخال جميع الحقول');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const storeList = document.getElementById('storeList');
    const newStore = document.createElement('li');
    newStore.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'border', 'border-pink-500', 'flex', 'items-center', 'space-x-4', 'relative');

    // إنشاء عنصر الصورة
    const imgElement = document.createElement('img');
    imgElement.src = event.target.result;
    imgElement.alt = 'صورة الوجبة';
    imgElement.classList.add('h-16', 'w-16', 'rounded-full', 'object-cover');

    // إنشاء عنصر النص الذي يحتوي على تفاصيل المتجر
    const textElement = document.createElement('div');
    textElement.innerHTML = `
      <strong>${storeType}</strong>: ${storeName}<br>
      هاتف: ${storePhone}<br>
      الوجبة: ${mealName}<br>
      التوصيل: ${deliveryAvailable}
    `;
    textElement.classList.add('text-gray-700');

    // زر الحذف
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-red-500', 'text-white', 'p-1', 'rounded');
    deleteButton.onclick = function() {
      storeList.removeChild(newStore);
    };

    // إضافة العناصر إلى قائمة المتاجر
    newStore.appendChild(imgElement);
    newStore.appendChild(textElement);
    newStore.appendChild(deleteButton);
    storeList.appendChild(newStore);
  };

  // قراءة صورة الوجبة إذا كانت موجودة
  if (storeImage) {
    reader.readAsDataURL(storeImage);
  }

  // إعادة تعيين النموذج
  document.getElementById('restaurantForm').reset();
}

