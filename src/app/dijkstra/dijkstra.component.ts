import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-dijkstra',
  templateUrl: './dijkstra.component.html',
  styleUrls: ['./dijkstra.component.css']
})
export class DijkstraComponent implements OnInit {

  lstNamePoint = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'Y', 'X', 'Z', 'T'];
  pointNum = 5;//số điểm
  lineNum = 10;//số cạnh
  G: number[][] = [];//lưu ma trận kề đồ thị
  lstPoint = [];//danh sách điểm
  lstLine = [];//danh sách cạnh
  lstLineFind = [];//danh sách cạnh đường đi ngắn nhất
  pointStart: any;
  pointEnd: any;
  msgs: any;
  msg: any;


  init() {//khởi tạo ma trận- điểm nào không có cạnh nối == -1
    for (let i = 0; i < this.pointNum; i++) {
      this.G[i] = [];
      for (let j = 0; j < this.pointNum; j++) {
        this.G[i][j] = (i == j) ? 0 : -1;
      }
    }
  }

  //reset
  reset() {
    this.G = [];
    this.lstLine = [];
    this.lstPoint = [];
    this.lstLineFind = [];
    this.random();
  }

  //random điểm, cạnh
  random() {
    for (let i = 0; i < this.pointNum; i++) {//random điểm
      this.lstPoint.push({ name: this.lstNamePoint[i], x: _.random(-100, 100), y: _.random(-100, 100) })
    }
    this.init();//khởi tạo ma trận kề
    let temp = [];//lưu khoảng cách giữa các điểm để random- do mảng 2 chiều không random được
    //temp chứa điểm đầu i, điểm cuối j và khoảng cách giữa chúng d
    for (let i = 0; i < this.pointNum; i++) {
      for (let j = 0; j < this.pointNum; j++) {//tính khoảng cách giũa các điểm
        let value = Math.sqrt((this.lstPoint[i].x - this.lstPoint[j].x) * (this.lstPoint[i].x - this.lstPoint[j].x) + (this.lstPoint[i].y - this.lstPoint[j].y) * (this.lstPoint[i].y - this.lstPoint[j].y));
        temp.push({ i: i, j: j, d: Math.round(value) });
      }
    }

    let dem = 0;//kiểm tra xem tạo đủ số cạnh chưa
    for (let i = temp.length - 1; i >= 0; i--) {
      if (dem == this.lineNum) return;//nếu đủ số cạnh thì return
      let rd = temp.splice(Math.floor(Math.random() * temp.length), 1);//random ra một phần tử
      if (rd[0].i == rd[0].j) continue;//nếu cạnh là điểm nối chính nó thì không tính
      this.G[rd[0].i][rd[0].j] = rd[0].d;//cạnh nào được random thì cập nhật khoảng cách vào ma trận kề
      this.lstLine.push({ point1: this.lstPoint[rd[0].i], point2: this.lstPoint[rd[0].j] });
      dem++;
    }
  }
  constructor() { }

  ngOnInit() {
    // this.dijkstra();
    this.random();
    console.log(this.G);
    this.msgs = [];
    this.msg = [];
    // console.log(this.lstLine);
  }

  Find() {//tìm đường đi
    if (this.pointEnd == undefined || this.pointStart == undefined) {
      this.msgs.push({ severity: 'error', summary: 'Cảnh báo', detail: 'Chọn hai điểm cần tìm đường' });
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
      return;
    }
    this.lstLineFind = [];
    this.dijkstra();
  }

  dijkstra() {
    var n = this.pointNum; var a = parseInt(this.pointStart) + 1; var b = parseInt(this.pointEnd) + 1; var i, sum = 0;
    //n - số điểm, từ điểm a đến điểm b
    var G: number[][] = [];
    var S: number[], Len: number[], P: number[];
    // nhap ma tran va tinh gia tri vo cung (sum)
    for (i = 0; i < n; i++) {
      G[i] = [];
      for (let j = 0; j < n; j++) {
        G[i][j] = this.G[i][j];
        if (G[i][j] == -1) G[i][j] = 0;
        sum += G[i][j];
      }
    }

    // dat vo cung cho tat ca cap canh khong noi voi nhau
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i != j && G[i][j] == 0)
          G[i][j] = sum;
      }
    }

    /* Do mang tinh tu G[0][0] nen can giam vi tri
    di 1 don vi de tinh toan cho phu hop*/
    a--;
    b--;
    Len = []; S = []; P = [];
    for (let i = 0; i < n; i++) {
      Len[i] = sum;                   // khoi tao do dai tu a toi moi dinh la vo cung
      S[i] = 0;                       // danh sach cac diem da xet
      P[i] = a;                       // dat diem bat dau cua moi diem la a
    }

    Len[a] = 0;                         // dat do dai tu a -> a la 0


    // tim duong di ngan nhat tu 1 dinh den moi dinh khac thi thay bang vong for:
    //for (int k = 0; k < n; k++)
    while (S[b] == 0) {                 // trong khi diem cuoi chua duoc xet
      for (i = 0; i < n; i++)          // tim 1 vi tri ma khong phai la vo cung
        if (!S[i] && Len[i] < sum)
          break;

      // i >=n tuc la duyet het cac dinh ma khong the tim thay dinh b -> thoat
      if (i >= n) {
        console.log("done dijkstra");
        break;
      }

      for (let j = 0; j < n; j++) {    // tim diem co vi tri ma do dai la min
        if (!S[j] && Len[i] > Len[j]) {
          i = j;
        }
      }

      S[i] = 1;                       // cho i vao danh sach xet roi

      for (let j = 0; j < n; j++) {    // tinh lai do dai cua cac diem chua xet
        if (!S[j] && Len[i] + G[i][j] < Len[j]) {
          Len[j] = Len[i] + G[i][j];      // thay doi len
          P[j] = i;                       // danh dau diem truoc no
        }
      }
    }
    console.log("done dijkstra");

    /* Do ta dang tinh toan tu dinh 0 nen
     muon hien thi tu dinh 1 thi can dung i + 1 de phu hop */

    console.log("start find path");

    let point = [];//các điểm đã đi qua
    if (Len[b] > 0 && Len[b] < sum) {
      console.log("Length of " + (a + 1) + " to " + (b + 1) + " is : " + Len[b]);
      this.msg = [];
      this.msg.push({ severity: 'success', summary: 'Kết quả: ', detail: 'Chiều dài quãng đường từ ' + this.lstNamePoint[this.pointStart] + " đến " + this.lstNamePoint[this.pointEnd] + " là: " + Len[b] });
      // truy vet
      while (i != a) {
        point.push(i);
        console.log((i + 1).toString() + " <-- ");
        i = P[i];
      }
      point.push(a);
      for (let i = point.length - 1; i > 0; i--) {
        this.lstLineFind.push({ point1: this.lstPoint[point[i]], point2: this.lstPoint[point[i - 1]] });
      }
      console.log(a + 1);
    } else {
      console.log("khong co duong di tu " + (a + 1) + " den " + (b + 1));
      let text = 'Không có đường đi từ ' + this.lstNamePoint[a] + ' đến ' + this.lstNamePoint[b];
      this.msg = [];
      this.msg.push({ severity: 'success', summary: 'Kết quả: ', detail: text });
      setTimeout(() => {
        this.msgs = [];
      }, 3000);
    }
  }
}
