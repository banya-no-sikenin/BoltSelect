
// ページの読み込みが完了したら実行する処理
window.onload = function() {

    let dw1 = document.getElementById('dropdown1');     
    let dw2 = document.getElementById('dropdown2'); 
    let atu = document.getElementById('input1');
    let lb1 = document.getElementById('Label1');

    fetch('base.csv')
        .then(response => response.text())
        .then(data => {
            
            const rows = data.split('\n');
            rows.forEach(row => {
                const columns = row.split(',');

                // 最初の列のデータを使ってドロップダウンのオプションを作成
                const option = document.createElement('option');
                option.text = columns[0];  // 例: 各行の最初の列をドロップダウンに表示
                option.value = columns[0]; // 値も同じものにする
                dw1.add(option);       // ドロップダウンに追加
            });
        })

        .catch(error => console.error('Error:', error));
        //dropdown2のアイテム入力
        addOption('P3（セムス）', 'P3');
        addOption('Set', 'Set');


    // ボタンがクリックされたときの処理
    document.getElementById('myButton').addEventListener('click', function() {
        // ボタンがクリックされたときの処理
        fetch('wsn.csv')
            .then(response => response.text())
            .then(data => {
                // CSVの各行を処理
                const rows = data.split('\n');
                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].split(',');
                    //console.log(dw1.value+columns[0]+":"+(dw1.value==columns[0]));
                    //console.log(dw1.value.length+"-"+columns[0].length);
                    if (dw1.value==columns[0]){
                        let ti=0.0;//合計長さ
                        let ph=parseFloat(columns[1])*3;//ピッチの３倍
                        let ws=parseFloat(columns[2]);//ワッシャ厚み
                        let sw=parseFloat(columns[3]);//SW厚み
                        let nt=parseFloat(columns[4]);//ナットの厚み
                        let at=parseFloat(atu.value);
                        //Size,Pich,Wasser,SW,Nutt
                        if(dw2.value=='P3') {
                            ti=ph+ws+sw+nt+at;
                        }else{
                            ti=ph+ws*2+sw*2+nt+at;
                        }
                        
                        //長さを切り上げ
                        let ref=0.0;
                        let m=0.0;
                        if (ti <= 30) {//最小30mm
                            ref=30;
                        } else if (ti <= 70) {//～70は5ｍｍおき
                            m=Math.ceil(ti/5);
                            ref=m*5;
                        } else if (ti <= 160) {//～160は10ｍｍおき
                            m=Math.ceil(ti/10);
                            ref=m*10;                           
                        } else {//～500は20ｍｍおき
                            m=Math.ceil(ti/20);
                            ref=m*20;   
                        }

                        lb1.textContent=ref;
                        break;
                    }else{
                        lb1.textContent='Ng';
                    }
                };
            })        
    });

    //ボルト種設定　セットならばワッシャの厚みが倍になる
    function addOption(text, value) {
        const option = document.createElement('option');
        option.text = text;
        option.value = value;
        dw2.appendChild(option);
    }

};