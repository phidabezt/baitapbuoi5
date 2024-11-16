export const banneritems = [
  {
      id: '1',
      name: 'anh 1',
      url: '/images/map1.png',
  },
  {
      id: '2',
      name: 'anh 2',
      url: '/images/map2.png',
  },
  {
      id: '3',
      name: 'anh 32',
      url: '/images/map3.png',
  },
  {
      id: '3',
      name: 'anh 32',
      url: '/images/map4.png',
  }
]

async function fetchData(url: string) {
  const response = await fetch(url);
  return response.json();
}

function mapFoodItems(items: any[]) {
  return items.map(item => ({
      ...item,
      address: '4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM',
      img: '/food/ga1.jpg',
      imgSmall: '/food/ga1.jpg',
  }));
}

export async function getFoods() {
  const foodData = await fetchData('http://localhost:8080/foods');

  const foodList = mapFoodItems(foodData);

  const todayFood = {
      title: 'Hôm Nay ăn gì',
      items: foodList,
  };

  return { todayFood, foodList };
}
