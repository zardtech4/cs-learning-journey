// Implements a spell-checker

#include <ctype.h>
#include <stdio.h>
#include <time.h>

#include "dictionary.h"


#define DICTIONARY "dictionaries/large"


double calculate(clock_t before, clock_t after);

int main(int argc, char *argv[])
{
    
    if (argc != 2 && argc != 3)
    {
        printf("Usage: ./speller [DICTIONARY] text\n");
        return 1;
    }


    clock_t before, after;

    
    double time_load = 0.0;
    double time_check = 0.0;
    double time_size = 0.0;
    double time_unload = 0.0;

    
    char *dictionary = (argc == 3) ? argv[1] : DICTIONARY;

    before = clock();

    bool loaded = load(dictionary);

    after = clock();

    
    if (!loaded)
    {
        printf("Could not load %s.\n", dictionary);
        return 1;
    }

    
    time_load = calculate(before, after);

    char *text = (argc == 3) ? argv[2] : argv[1];

    FILE *file = fopen(text, "r");

    if (file == NULL)
    {
        printf("Could not open %s.\n", text);
        unload();
        return 1;
    }

    
    printf("\nMISSPELLED WORDS\n\n");

    
    int index = 0;
    int misspellings = 0;
    int words = 0;

    char word[LENGTH + 1];

    char c;

    while (fread(&c, sizeof(char), 1, file))
    {
        
        if (isalpha(c) || (c == '\'' && index > 0))
        {
            
            word[index] = c;
            index++;

            
            if (index > LENGTH)
            {
                
                while (fread(&c, sizeof(char), 1, file) && isalpha(c))
                {
                    
                }

                
                index = 0;
            }
        }

        
        else if (isdigit(c))
        {
            
            while (fread(&c, sizeof(char), 1, file) && isalnum(c))
            {
            
            }

            
            index = 0;
        }

        
        else if (index > 0)
        {
        
            word[index] = '\0';

            
            words++;

            
            before = clock();

            bool misspelled = !check(word);

            after = clock();

            
            time_check += calculate(before, after);

            
            if (misspelled)
            {
                printf("%s\n", word);
                misspellings++;
            }

            
            index = 0;
        }
    }

    
    if (ferror(file))
    {
        fclose(file);
        printf("Error reading %s.\n", text);
        unload();
        return 1;
    }

    
    fclose(file);

    
    before = clock();

    unsigned int n = size();

    after = clock();

    
    time_size = calculate(before, after);

    before = clock();

    bool unloaded = unload();

    after = clock();

    
    if (!unloaded)
    {
        printf("Could not unload %s.\n", dictionary);
        return 1;
    }

    
    time_unload = calculate(before, after);

    
    printf("\nWORDS MISSPELLED:     %d\n", misspellings);
    printf("WORDS IN DICTIONARY:  %d\n", n);
    printf("WORDS IN TEXT:        %d\n", words);
    printf("TIME IN load:         %.2f\n", time_load);
    printf("TIME IN check:        %.2f\n", time_check);
    printf("TIME IN size:         %.2f\n", time_size);
    printf("TIME IN unload:       %.2f\n", time_unload);
    printf("TIME IN TOTAL:        %.2f\n\n",
           time_load + time_check + time_size + time_unload);
    return 0;
}


double calculate(clock_t before, clock_t after)
{
    return (double)(after - before) / CLOCKS_PER_SEC;
}