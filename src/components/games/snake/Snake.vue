<template>
  <div>
    <div id="container-snake">
      <div class="columns">
        <div class="column">
          <button-game
              @[EventsType.START_GAME]="start = !start"
              :reset-game="resetSnakeGame"
              :score="score"
              :start="start"/>
        </div>

        <div class="column">
          <canvas
              ref="snake"
              id="snake"
              :width="containerSnake.width*containerSnake.cellSize"
              :height="containerSnake.height*containerSnake.cellSize" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonGame from '../../games/ButtonGame'
import {EventsType} from '@/constants/events/games'
import {SnakeGameStyle} from '@/constants/games/snake'
export default {
  name: 'Snake',
  components: { ButtonGame },
  data () {
    return {
      score: 0,
      start: false,
      watchMoves: null,
      containerSnake: { width: 60, height: 25, cellSize: 15 },
      snake: [ { x: 0, y: 0 } ],
      food: { x: 0, y: 0 },
      ctx: undefined,
      nextDirection: null,
      directions: [
        { // left
          keyCode: 37,
          move: {
            x: -1,
            y: 0
          }
        },
        { // top
          keyCode: 38,
          move: {
            x: 0,
            y: -1
          }
        },
        {
          direction: "right",
          keyCode: 39,
          move: {
            x: 1,
            y: 0
          }
        },
        {
          direction: "bottom",
          keyCode: 40,
          move: {
            x: 0,
            y: 1
          }
        }
      ]
    }
  },
  watch: {
    start () {
      if (this.start) {
        this.watchMoves = setInterval(this.watchNextMove, 200)
      } else {
        clearInterval(this.watchMoves)
      }
    }
  },
  computed: {
    EventsType () { return EventsType }
  },
  mounted () {
    window.addEventListener("keydown", this.onKeyPress)
    this.ctx = this.$refs.snake.getContext('2d')
    this.resetSnakeGame()
    this.drawSnake()
  },
  methods: {
    drawSnake () {
      this.ctx.beginPath()

      this.snake.forEach( (snake) => {
        this.ctx.beginPath()
        this.ctx.rect(snake.x * this.containerSnake.cellSize, snake.y * this.containerSnake.cellSize, this.containerSnake.cellSize, this.containerSnake.cellSize)
        this.ctx.fillStyle = SnakeGameStyle.SNAKE_COLOR
        this.ctx.fill()
        this.ctx.closePath()
      })

      if (this.food !== null) {
        this.ctx.beginPath()
        this.ctx.rect(this.food.x * this.containerSnake.cellSize, this.food.y * this.containerSnake.cellSize, this.containerSnake.cellSize, this.containerSnake.cellSize)
        this.ctx.fillStyle = SnakeGameStyle.SNAKE_FOOD_COLOR
        this.ctx.fill()
        this.ctx.closePath()
      }

      this.ctx.closePath()
    },
    watchNextMove () {
      // If no direction nothing to do
      if (this.nextDirection == null) { return }
      this.clear()
      // Compute new header depending on the next direction
      this.snake.unshift({
        x: this.snake[0].x + this.nextDirection.move.x,
        y: this.snake[0].y + this.nextDirection.move.y
      })

      // Check if the new position is not out of the canvas
      if (this.snake[0].x < 0 || this.snake[0].x >= this.containerSnake.width || this.snake[0].y < 0 || this.snake[0].y >= this.containerSnake.height) {
        this.resetSnakeGame()
        window.alert('Dommage, le serpent est sorti du jeu !')
        return
      }

      // Check if the new position is not in collision with its body
      for (let i = 1; i < this.snake.length; i++) {
        if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) {
          this.resetSnakeGame()
          window.alert('Oups le serpent entre entré en collision avec lui-même !')
          return
        }
      }

      // If we touch the food create a new food place Else remove the last element of the snake
      if (this.food !== null && this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
        this.score += 10
        this.moveFoodToFreePlace()
      } else {
        this.snake.pop()
      }

      this.drawSnake()
    },
    resetSnakeGame () {
      this.clear()
      this.start = false
      this.score = 0
      // Create snake in the middle of the canvas
      this.snake = [{x: Math.round(this.containerSnake.width / 2), y: Math.round(this.containerSnake.height / 2)}]
      this.moveFoodToFreePlace()
      this.drawSnake()
    },
    moveFoodToFreePlace () {
      this.food = null
      while (this.food == null) {
        const x = Math.floor(Math.random() * this.containerSnake.width)
        const y = Math.floor(Math.random() * this.containerSnake.height)

        // Check if this coord = a snake coord
        const snakePart = this.snake.find(snakeP => snakeP.x === x && snakeP.y === y)

        // If it is not a snake coord, move food on new place
        if (!snakePart) { this.food = { x, y } }
      }
    },
    onKeyPress (event) {
      // Capture keyCode who reset or start/pause the game
      event.keyCode === 97 ? this.start = !this.start : event.keyCode === 96 ? this.resetSnakeGame() : null
      // Get the new direction
      const newDirection = this.directions.find(c => c.keyCode === event.keyCode)
      if (!newDirection) { return }

      // From up, we can go right or left but not down and so on for other directions so we use the following code to know if the next direction can be set
      if (this.nextDirection == null || Math.abs(newDirection.keyCode - this.nextDirection.keyCode) !== 2) {
        this.nextDirection = newDirection
      }
    },
    clear () {
      this.ctx.clearRect(0, 0, this.containerSnake.width * this.containerSnake.cellSize, this.containerSnake.height * this.containerSnake.cellSize)
    }
  }
}
</script>
