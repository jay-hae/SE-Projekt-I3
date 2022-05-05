import random

random.seed(a=None)


def package_distance():
    value = 20
    tolerance_down = -1
    tolerance_up = 7
    counter_discard = 0
    counter_loop = 0
    for i in range(1000):
        counter_loop += 1
        package_space = (value - tolerance_down) + ((tolerance_up + (-tolerance_down)) * random.random())
        if package_space > 25:
            counter_discard += 1
    print(f"Verworfene Pakete: {(float(counter_discard) / (float(counter_loop)) * 100)}%")


