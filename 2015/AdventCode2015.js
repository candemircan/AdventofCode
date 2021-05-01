const fs = require('fs')
const MD5 = require("crypto-js/md5")
class DayOne{
    
    
    constructor(){
        this.text_array = fs.readFileSync('1.txt','utf-8').split("");
        this.cur_floor = 0;
        this.basement_loc;
    }
    
    movefloor(){
        let hit_basement = false;
        for(let [index, element] of this.text_array.entries()){
            this.cur_floor = element == "(" ? this.cur_floor + 1: this.cur_floor -1;
            if (hit_basement == false && this.cur_floor == -1){
                this.basement_loc = index + 1;
                hit_basement = true;
            }
        }
        console.log(`Take the instructions to floor no ${this.cur_floor}!`)
        console.log(`Position ${this.basement_loc} took you to the basement first!`)
    }
}

class DayTwo{
    
    
    constructor(){
        let text = fs.readFileSync('2.txt','utf-8').split('\n');
        this.text_array = [ ];
        for (let i of text){
            this.text_array.push(i.split('x'));
        }
        // remove empty line entry
        this.text_array.pop();
        this.total_wrap = 0;
        this.total_ribbon = 0;
    }
    
    calculate_wrap(){
        for (let i of this.text_array){
            let base = 2 * (i[0] * i[1] + i[1] * i[2] + i[2] * i[0]);
            let s_sides = this.smallest_sides(i);
            let extra_wrap = s_sides[0] * s_sides[1];
            this.total_wrap += base + extra_wrap;
        }
        console.log(`You need ${this.total_wrap} square feet of wrapping paper.`)
    }

    calculate_ribbon(){
        for (let i of this.text_array){
            let s_sides = this.smallest_sides(i);
            let base = s_sides[0] * 2 + s_sides[1] * 2;
            let extra = i[0] * i[1] * i[2];
            this.total_ribbon += base + extra;
        }
        console.log(`You need ${this.total_ribbon} feet of ribbon`)
    }

    smallest_sides(arr){
        let n_arr = arr.slice();
        let cur_min = Math.min(...n_arr)
        let to_remove = n_arr.indexOf(cur_min.toString());
        n_arr.splice(to_remove, 1);
        return [cur_min, Math.min(...n_arr)];
    }
}

class DayThree{
    
    constructor(){
        this.text_array = fs.readFileSync('3.txt','utf-8').split('');
        this.santa = [];
        this.santa_and_robot = [];
        this.present_guide = {'<': [-1, 0], '>': [1, 0], 'v': [0, -1], '^': [0, 1]}
    }

    santa_trip(){
        let [x, y] = [0, 0];
        for (let i of this.text_array){
            [x, y] = this.givepresent(x, y, i, this.santa);
        }
        
        let ans = this.arr_to_unique_len(this.santa);
        console.log(`${ans} houses have received at least one present!`);
    }

    santa_robo_trip(){
        let [sx, sy] = [0, 0];
        let [rx, ry] = [0, 0];
        let santa = true;
        for (let i of this.text_array){
            if (santa){
                [sx, sy] = this.givepresent(sx, sy, i, this.santa_and_robot);
            }
            else{
                [rx, ry] = this.givepresent(rx, ry, i, this.santa_and_robot);
            }
            santa = !santa;
        }
        let ans = this.arr_to_unique_len(this.santa_and_robot);
        console.log(`${ans} houses have received at least one present!`);

    }

    givepresent(w_x, w_y, move, history){
        let delta = this.present_guide[move];
        w_x += delta[0];
        w_y += delta[1];
        history.push([w_x, w_y]);
        return [w_x, w_y]
    }

    arr_to_unique_len(arr){
        // this is novel for me
        let set = new Set(arr.map(JSON.stringify));
        let new_arr = Array.from(set).map(JSON.parse);
        return new_arr.length
    }
}

class DayFour{
    
    constructor(){
        this.base = fs.readFileSync('4.txt','utf-8');
    }

    find_small_key(compare){
        let found = false;
        let candidate = 1;
        let len = compare.length;
        while (found == false){
            let key = this.base + candidate.toString();
            let check = MD5(key).toString();
            if (check.slice(0, len) == compare){
                found = true;
                console.log(`The number you need is ${candidate}`);
            }
            else {
                candidate += 1;
            }
        }
    }
}