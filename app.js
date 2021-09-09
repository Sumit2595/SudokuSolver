const func= ()=>{
    $("#grid").hide()
    var tab=new Array(8);
    let count=0;
    //document.getElementById(`cell-${i}`).value
    for(let i=0;i<9;i++)
    {   tab[i]=new Array(8);
        for(let j=0;j<9;j++)
         {  var t=document.getElementById(`cell-${count}`).value    
         if(t!='')
         tab[i][j]=t
         else
          tab[i][j]="."
             count++;
         }
    }

    solveSudoku(tab)
    count=0;
    for(let i=0;i<9;i++)
    {  let markup="";
        for(let j=0;j<9;j++){
           markup+=`<td class="sdata">${tab[i][j]}</td>`
         } 
         $("#solved").append(`<tr>${markup}</tr>`)
         $("#solved").show(); 
    }
   
}

var solveSudoku = function(board) {
    solve();
	return board;
    
	// for each cell, try all values from [1, 9] and check if it is valid
	// backtracks when the value is not valid and tries with other values
    function solve() {
        for(let r = 0; r < 9; ++r) {
            for(let c = 0; c < 9; ++c) {
                if(board[r][c] !== '.') {
                    continue;
                }
                for(let v = 1; v <= 9; ++v) {
                    const v_s = v.toString();
                    if(isValid(r, c, v_s)) {
                        board[r][c] = v_s;
                        if(solve()) {
                            return true;
                        } else {
                            board[r][c] = '.';
                        }
                    }
                }
                return false;
            }
        }
        return true;
    }
    
    function isValid(r, c, v) {
        const regionRow = 3 * Math.floor(r / 3);    // gets region start row
        const regionCol = 3 * Math.floor(c / 3);    // gets region start col
        for (let i = 0; i < 9; i++) {
            if (board[i][c] === v) return false;    // check row
            if (board[r][i] === v) return false;    // check col
            const cube_r = regionRow + Math.floor(i / 3),
                  cube_c = regionCol + i % 3;
            if (board[cube_r][cube_c] === v) return false;    // check the square
        }
        return true;
    }
}
