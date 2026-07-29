#include<stdio.h>
#include <stdlib.h>

int main(void)

{
    int size;

    printf("Enter the size of the array: ");
    scanf("%d", &size);
     int *arr = (int *)malloc(size * sizeof(int));

     for (int i = 0; i < size; i++)
{
    printf("Enter element %d: ", i + 1);
    scanf("%d", &arr[i]);
}
          for (int i = 0; i < size; i++)
      {
        arr[i] = arr[0];
        printf("%d\n ", arr[i]);
      }
        free(arr);

    return 0;
}
    