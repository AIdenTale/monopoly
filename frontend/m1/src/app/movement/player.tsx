export const cellInRange = (a:number, b:number, c:number) => 
{
    b++;
    if(a > b) {b += 41;c += 41}
    for(let i = a; i < b; ++i){
        if (c == i){
            return true;
        }
    }
    return false;

}

export class PlayerMovement{
    playerX = 0;
    playerY = 0;
    node1: any;

    corner_card: any;
    card: any;
    card_vertical: any
    delta: any;
    card_price: any
    playerPos: any


    constructor(){
        this.playerPos = 0;
    }

    setData = (node: any, root: any) => {
        this.node1 = node;
        this.corner_card = root.current?.querySelector('.card-m-corner--QZLscn1i');
	    this.card = root.current?.querySelector('.card-m-top--nZivJgid');
	    this.card_price = root.current?.querySelector('.card-m-price--e7eLvahJ')
	    this.card_vertical = root.current?.querySelector('.card-m-right--VsNfd96k')
        this.delta = this.corner_card.offsetWidth / 2;
    }

    player_move = (n: number) => {
        let move_to = this.playerPos + n;
        if(move_to > 41){
            move_to -= 41
        }
        this.player_to_cell(move_to)
    }

    _move_corner = (coords: Array<number>, c: number) => {
        const coords_delta = this._get_cell_coords(c)

        this.player_movement_control(coords_delta[0], coords_delta[1]);
        setTimeout(() => {
            this.player_movement_control(coords[0], coords[1]);
        }, 600);
    }

    _move_two_cornerns = (coords: Array<number>, c1: number, c2: number) => {
        const delta = this._get_cell_coords(c1);
        const delta2 = this._get_cell_coords(c2);

        this.player_movement_control(delta[0], delta[1]);
        setTimeout(() => {
            this.player_movement_control(delta2[0], delta2[1]);
        }, 500);
        setTimeout(() => {
            this.player_movement_control(coords[0], coords[1]);
        }, 1100);
    }

    player_to_cell = (x: number) => {
        const coords = this._get_cell_coords(x)
        console.log("Playerpos : " + this.playerPos, x)
        if (cellInRange(this.playerPos, x, 11) || 
            cellInRange(this.playerPos, x, 21) ||
            cellInRange(this.playerPos, x, 31) ||
            cellInRange(this.playerPos, x, 1))
            {

            if(cellInRange(11, 21, x)){
                console.log("Range 11-21")
                if(cellInRange(37, 40, this.playerPos))
                {
                    this._move_two_cornerns(coords, 41, 11)
                    this.playerPos = x;
                    return;
                }
                this._move_corner(coords, 11)
                this.playerPos = x;
                return;
            }

            if (cellInRange(21, 31, x)){
                console.log("Range 21-31")
                if(cellInRange(6, 10, this.playerPos))
                {
                    this._move_two_cornerns(coords, 11, 21)
                    this.playerPos = x;
                    return;
                }
                this._move_corner(coords, 21)
                this.playerPos = x;
                return;

            }

            if(cellInRange(31, 41, x)){
                console.log("Range 31-41")
                if(cellInRange(17, 20, this.playerPos))
                {
                    this._move_two_cornerns(coords, 21, 31)
                    this.playerPos = x;
                    return;
                }
                this._move_corner(coords, 31)
                this.playerPos = x;
                return;
            }

            if(cellInRange(1, 18, x)){
                if(cellInRange(27, 30, this.playerPos)){
                    this._move_two_cornerns(coords, 31, 41)
                    this.playerPos = x;
                    return;
                }
                console.log("Range 1-18")

                this._move_corner(coords, 41)
                this.playerPos = x;
                return;
            }

            this.playerPos = x;
            return;
        }
        
        console.log("NO RANGE")
        this.playerPos = x;
        this.player_movement_control(coords[0], coords[1])
    }
    
    player_movement_control = (x:number, y:number) => {
        console.log(x,y)
        this.playerX = x;
        this.playerY = y;
        this.node1.current?.to({
            x: x,
            y: y,
            duration: 0.5
        })
    }
    
    _get_cell_coords = (cell: number): number[] =>  {
        switch(cell){
            case 1:
                return Array(this.corner_card.offsetWidth / 2, this.corner_card.offsetHeight / 2);
            case 41:
                return Array(this.corner_card.offsetWidth / 2, this.corner_card.offsetHeight / 2);
            case 11:
                return Array(3*(this.delta + 3*this.card.offsetWidth), this.corner_card.offsetHeight / 2);
            case 21:
                return Array(3*(this.delta + 3*this.card.offsetWidth) - 3, this.corner_card.offsetHeight + (this.corner_card.offsetHeight/2 - this.card_price.offsetHeight) + 9*this.card_vertical.offsetHeight +19);
            case 31:9
                return Array(this.corner_card.offsetWidth / 2, this.corner_card.offsetHeight + (this.corner_card.offsetHeight/2 - this.card_price.offsetHeight) + 9*this.card_vertical.offsetHeight +19);
        }
        
        if (cell < 11){
            return Array(this.card.offsetWidth*cell - 2, this.corner_card.offsetHeight / 2);
        } else if (cell > 11 && cell < 21){
            return Array(3*(this.delta + 3*this.card.offsetWidth), this.corner_card.offsetHeight + this.card_vertical.offsetHeight*(cell - 11) - this.card_vertical.offsetHeight / 2);
        } else if (cell > 21 && cell < 31){
            return Array(3*(this.delta + 3*this.card.offsetWidth) - this.card.offsetWidth*(cell - 20) + this.delta, this.corner_card.offsetHeight + (this.corner_card.offsetHeight/2 - this.card_price.offsetHeight) + 9*this.card_vertical.offsetHeight + 10);
        } else if (cell > 31 && cell < 41){
            return Array(this.corner_card.offsetWidth / 2 + 10, this.corner_card.offsetHeight + (this.corner_card.offsetHeight/2 - this.card_price.offsetHeight) + 9*this.card_vertical.offsetHeight - this.card_vertical.offsetHeight*(cell - 31)- 15);
        }
    
        return Array(0,0)
    }
}