
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include "dictionary.h"
#include <stdio.h>

typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;


#define N 26

node *table[N];

unsigned int count = 0;


bool check(const char *word)
{
    unsigned int index = hash(word);

    node *cursor = table[index];

    while (cursor != NULL)
    {
        if (strcmp(cursor->word, word) == 0)
        {
            return true;
        }

        cursor = cursor->next;
    }

    return false;
}


unsigned int hash(const char *word)
{
    
    return toupper(word[0]) - 'A';
}


bool load(const char *dictionary)
{
    FILE *file = fopen(dictionary, "r");

    if (file == NULL)
    {
        return false;
    }

    char word[LENGTH + 1];

    while (fscanf(file, "%s", word) != EOF)
    {
        node *new_node = malloc(sizeof(node));

        if (new_node == NULL)
        {
            fclose(file);
            return false;
        }

        strcpy(new_node->word, word);

        new_node->next = NULL;

        unsigned int index = hash(word);

        new_node->next = table[index];

        table[index] = new_node;
        count++;
    }

    fclose(file);

    return true;
}


unsigned int size(void)
{
    if (count == 0)
    {
        return 0;
    }
    else
    {
        return count;
    }
    
}


bool unload(void)
{
    for (unsigned int i = 0; i < N; i++)
    {
        node *cursor = table[i];

        while (cursor != NULL)
        {
            node *tmp = cursor->next;
            free(cursor);
            cursor = tmp;
        }
    }

    return true;
}