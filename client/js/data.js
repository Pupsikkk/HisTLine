class Data {
  constructor() {
    this.dataList = [];
    this.dataForOutput = [];
    this.types = [];
    this.subtypes = [];
    this.defaultColor = "#969696";
  }

  async updateFilters() {
    this.types = await (
      await fetch("http://localhost:3000/type", { method: "GET" })
    ).json();
    this.subtypes = await (
      await fetch("http://localhost:3000/subtype", {
        method: "GET",
      })
    ).json();
    // console.log(this.types);
    // console.log(this.subtypes);
  }

  async getSubtypeColorByName(subtype_name) {
    await this.updateFilters();
    console.log(subtype_name);
    const findedSubtype = this.subtypes.find(
      (subtype) => subtype.subtype_name === subtype_name
    );
    console.log(findedSubtype);
    if (findedSubtype) return findedSubtype.subtype_color;
    return this.defaultColor;
  }

  getTypeColorByName(type_name) {
    const findedType = this.types.find((type) => type.type_name === type_name);
    if (findedType) return findedType.type_color;
    return this.defaultColor;
  }

  addNote = (
    id,
    name,
    yearStart,
    yearEnd,
    type,
    subtype,
    description,
    images,
    links
  ) => {
    this.dataList.push({
      id: id,
      name: name,
      yearStart: yearStart,
      yearEnd: yearEnd,
      columnIndex: null,
      type: type,
      subtype: subtype,
      description: description,
      images: images,
      links: links,
    });
  };

  getNote = (name) => {
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].name == name) return this.dataList[i];
    }
  };

  filter = (fromYear, toYear) => {
    this.dataForOutput = [];
    for (let item of this.dataList)
      if (
        (item.yearStart <= toYear && item.yearStart >= fromYear) ||
        (item.yearEnd <= toYear && item.yearEnd >= fromYear) ||
        (toYear <= item.yearEnd && toYear >= item.yearStart)
      )
        this.dataForOutput.push(item);
  };

  structuring = (toYear, step, columnWidth) => {
    let columnArr = [];
    for (let item of this.dataForOutput) {
      if (columnArr.length == 0) {
        columnArr.push([item]);
      } else {
        for (let i = 0; i < columnArr.length; i++) {
          let column = columnArr[i];
          let canceled = false;
          for (let columnItem of column) {
            if (
              (columnItem.yearEnd >= item.yearEnd &&
                columnItem.yearStart < item.yearEnd) ||
              (columnItem.yearEnd > item.yearStart &&
                columnItem.yearStart <= item.yearStart) ||
              (item.yearStart < columnItem.yearEnd &&
                item.yearEnd > columnItem.yearEnd) ||
              (item.yearStart < columnItem.yearStart &&
                item.yearEnd > columnItem.yearStart)
            ) {
              canceled = true;
              break;
            }
          }
          if (!canceled) {
            column.push(item);
            i += columnArr.length;
          }
          if (canceled && i + 1 == columnArr.length) {
            columnArr.push([item]);
            i += columnArr.length;
          }
        }
      }
    }
    for (let i = 0; i < columnArr.length; i++) {
      for (let item of columnArr[i]) {
        item.columnIndex = i;
      }
    }
    for (let i = 0; i < this.dataForOutput.length; i++) {
      let item = this.dataForOutput[i];
      item.posForOutp = {
        posX: 50 + columnWidth * item.columnIndex + 2 * item.columnIndex + 5,
        posY: (toYear - item.yearEnd) * step + 22,
        height: (item.yearEnd - item.yearStart) * step - 12,
        width: columnWidth - 10,
      };
    }
  };

  clearLines = (tableContainer) => {
    let inf_outp = document.querySelector(".timeline-info-container");
    console.log(tableContainer);
    while (tableContainer.lastChild.classList == "timeline-years-item") {
      tableContainer.removeChild(tableContainer.lastChild);
    }
    while (inf_outp.firstChild) {
      inf_outp.removeChild(inf_outp.firstChild);
    }
  };

  async addToTable(tableContainer, tableH, step) {
    tableH = tableH - 105;
    let inf_outp = document.querySelector(".timeline-info-container");
    for (let item of this.dataForOutput) {
      let itemPos = item.posForOutp;
      console.log(item);

      tableContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="timeline-years-item" style="background-color: ${this.getTypeColorByName(
          item.type
        )}; border: ${await this.getSubtypeColorByName(
          item.subtype
        )} 5px solid;height: ${itemPos.height}px; width: ${
          itemPos.width
        }px;top:${itemPos.posY}px;left:${itemPos.posX}px;"></div>`
      );
      let cur_height, cur_width, cur_posY, cur_posX;
      let height_mode = 80;
      cur_height = itemPos.height;
      cur_posY = itemPos.posY + 4;
      if (itemPos.posY < 0) {
        cur_posY = 0;
        cur_height = itemPos.height + itemPos.posY + 5;
      }
      if (itemPos.posY + itemPos.height > tableH) {
        cur_height = tableH - itemPos.posY;
      }
      if (columnWidth > 70) height_mode = 110;
      if (columnWidth <= 40) height_mode = 60;
      cur_posX = itemPos.posX + 4;
      cur_width = itemPos.width + 2;
      inf_outp.insertAdjacentHTML(
        "beforeend",
        `<div class="timeline-info-item" style="height: ${cur_height}px; width: ${cur_width}px;top:${cur_posY}px;left:${cur_posX}px;z-index:105;">
                <div style="width: 100%;height: ${
                  (cur_height >= height_mode ? height_mode : cur_height) <=
                  step * 2
                    ? 0
                    : cur_height >= height_mode
                    ? height_mode
                    : cur_height
                }px;position: sticky;top:-1px;">
                    <img class="timeline-img" src="${item.images}" alt="">
                </div>
            </div>`
      );
    }
  }
}
