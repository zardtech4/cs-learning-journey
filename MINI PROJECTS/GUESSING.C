#include<stdio.h>

int main(void)

{
    srand(time(NULL));

    int secret= rand() % 100 + 1;
    int guess = 0;


while(guess !=secret)
{
    printf("Guess the number:\n");
scanf("%d", &guess);

if(guess < secret)
{
    printf("too low!!!\n");
}
else if(guess > secret)
{
    printf("too high!!!\n");
}
else
{
    printf("Correct!!!\n");
}
}
}


