const barsContainer = document.getElementById("bars");
let array = [];

function generateArray(size = 50) {
  array = [];
  barsContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    barsContainer.appendChild(bar);
  }
}

async function sort() {
  const algorithm = document.getElementById("algorithm").value;
  switch (algorithm) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "merge":
      await mergeSort(array, 0, array.length - 1);
      break;
    case "quick":
      await quickSort(array, 0, array.length - 1);
      break;
  }
}

async function swap(el1, el2) {
  const temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
  await new Promise(resolve => setTimeout(resolve, 50));
}

/* -------- Bubble Sort -------- */
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";

      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        await swap(bars[j], bars[j + 1]);
      }

      bars[j].style.background = "#4caf50";
      bars[j + 1].style.background = "#4caf50";
    }
  }
}

/* -------- Selection Sort -------- */
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
        minIndex = j;
      }
    }
    await swap(bars[i], bars[minIndex]);
  }
}

/* -------- Insertion Sort -------- */
async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (j > 0 && parseInt(bars[j - 1].style.height) > parseInt(bars[j].style.height)) {
      await swap(bars[j], bars[j - 1]);
      j--;
    }
  }
}

/* -------- Merge Sort -------- */
async function mergeSort(arr, l, r) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m + 1, r);
  await merge(l, m, r);
}

async function merge(l, m, r) {
  const bars = document.getElementsByClassName("bar");
  let left = [], right = [];

  for (let i = l; i <= m; i++) left.push(parseInt(bars[i].style.height));
  for (let i = m + 1; i <= r; i++) right.push(parseInt(bars[i].style.height));

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      bars[k++].style.height = `${left[i++]}px`;
    } else {
      bars[k++].style.height = `${right[j++]}px`;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  while (i < left.length) bars[k++].style.height = `${left[i++]}px`;
  while (j < right.length) bars[k++].style.height = `${right[j++]}px`;
}

/* -------- Quick Sort -------- */
async function quickSort(arr, low, high) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  const bars = document.getElementsByClassName("bar");
  let pivot = parseInt(bars[high].style.height);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      await swap(bars[i], bars[j]);
    }
  }
  await swap(bars[i + 1], bars[high]);
  return i + 1;
}

generateArray();