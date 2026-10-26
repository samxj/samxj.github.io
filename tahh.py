import turtle
import random

oliver = turtle.Turtle()
oliver.speed(0)
oliver.color("aqua")
turtle.bgcolor("black")

for i in range(20):
    x = random.randint(-200, 200)
    y = random.randint(-200, 200)
    size = random.randint(20, 100)

    oliver.penup()
    oliver.goto(x, y)
    oliver.pendown()
    oliver.circle(size)

turtle.done()

'''
1 - Seeing what 'i' does: print, circle, square
2 - Using it to make a square spiral out from the middle
3 - Introduce modules
4 - Random position and size circles
'''

