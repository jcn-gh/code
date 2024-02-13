"""Module providing a function printing python version."""

import sys


def fizz_buzz(max_num):
    """
    FizzBuzz

    Prints numbers from 1 to max_num,
    replacing multiples of 3 with 'Fizz',
    multiples of 5 with 'Buzz',
    and multiples of both 3 and 5 with 'FizzBuzz'.

    Args:
        max_num (int): The maximum number to print.

    Returns:
        None
    """

    print(sys.version)
    for num in range(1, max_num+1):
        if num % 15 == 0:
            print("FizzBuzz")
        elif num % 3 == 0:
            print("Fizz")
        elif num % 5 == 0:
            print("Buzz")
        else:
            print(num)


fizz_buzz(16)