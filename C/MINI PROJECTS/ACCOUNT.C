#include<stdio.h>
#include<string.h>

int main (void)
{int choice;
    float balance;
    float I;
printf("What is your first deposit?");
scanf("%f", &I);

printf("Your first deposit is: %.2f", I);
balance = I;

while(1)
{
      printf("\nCurrent balance: %.2f\n", balance);

        printf("\nWhat would you like to do?\n");
        printf("1. Deposit\n");
        printf("2. Withdraw\n");
        printf("3. Check balance\n");
        printf("4. Exit\n");
        scanf("%d", &choice);

if (choice==4)
{
    printf("Thank you for using our banking system.\n");
    break;
}
else if (choice==1)
{
    printf("How much would you like to deposit?\n");
    scanf("%f", &I);
    balance += I;
    printf("You have deposited: %.2f\n", I);
}
else if (choice==2)
{
    printf("How much would you like to withdraw?\n");
    scanf("%f", &I);
    if (I > balance)
    {
        printf("Insufficient funds.\n");
    }
    else
    {
        balance -= I;
        printf("You have withdrawn: %.2f\n", I);
    }
}
else if (choice==3)
{
    printf("Your current balance is: %.2f\n", balance);
}
else
{
    printf("Invalid choice. Please try again.\n");
}

}
}
