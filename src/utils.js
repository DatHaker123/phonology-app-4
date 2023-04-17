export const availableColors = ["red", "blue", "green", "orange", "yellow"];
export const availableShapes = ["square", "triangle", "rectangle", "circle"];

export function containsDefault(arr) {
  return (
    arr.some((e) => e.color == "default") ||
    arr.some((e) => e.shape == "default")
  );
}

export function generateRandomItems(count) {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({
      color: availableColors[Math.floor(Math.random() * availableColors.length)],
      shape: availableShapes[Math.floor(Math.random() * availableShapes.length)],
    });
  }
  return items;
} // TODO: Add a check to make sure that the generated items are not identical, optimize this function by mapping instead of looping

export function itemListEquals(itemList1, itemList2) {
  if (itemList1.length !== itemList2.length) {
    return false;
  }

  for (let i = 0; i < itemList1.length; i++) {
    if (!itemEquals(itemList1[i], itemList2[i])) {
      return false;
    }
  }

  return true;
}

export function itemEquals(item1, item2) {
  return item1.color === item2.color && item1.shape === item2.shape;
}

export function containsIdentcalItems(itemList) {
  for (let i = 0; i < itemList.length; i++) {
    for (let j = i + 1; j < itemList.length; j++) {
      if (itemEquals(itemList[i], itemList[j])) {
        return true;
      }
    }
  }
  return false;
}

export function generateRandomRule(itemList) {
  while (true) {
    let rule = {
      inr: itemList[Math.floor(Math.random() * itemList.length)],
      trm: itemList[Math.floor(Math.random() * itemList.length)],
      dir: Math.random() < 0.5 ? "right" : "left",
      inp: "inr",
      out: generateRandomItems(1)[0],
      cnd: "default",
    };
    if (!containsIdentcalItems([rule.inr, rule.trm, rule.out])) {
      return rule;
    }
  }
}

export function applyRule(rule, itemList) {
  const initiator = rule.inr;
  const terminator = rule.trm;
  const output = rule.out;
  let itemListCopy = [...itemList]
  if (rule.dir === "right") {
    itemListCopy = itemListCopy.reverse();
  }

  let newItemList = [];
  let transform = false;
  for (const item of itemListCopy) {
    switch (item.color + item.shape) {
      case initiator.color + initiator.shape:
        if (transform) {
          newItemList.push(output);
        }
        else{
          newItemList.push(item);
        }
        break;
      case terminator.color + terminator.shape:
        transform = true;
      default:
        newItemList.push(item);
    }
  }

  if (rule.dir === "right") {
    newItemList = newItemList.reverse();
  }

  return newItemList;
}

export function findDifferenceList(itemList1, itemList2) {
  let differenceList = [];
  for (let i = 0; i < itemList1.length; i++) {
    if (!itemEquals(itemList1[i], itemList2[i])) {
      differenceList.push(i);
    }
  }

  return differenceList;
}

export function checkRule(rule, inputList , resultList , iterative = false) {
  return itemListEquals(applyRule(rule, inputList), resultList);
}