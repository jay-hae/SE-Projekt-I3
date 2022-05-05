import random, sys, os

nennwert = 2
toleranz = 0.01
counter_hit = 0
counter_try = 0
random.seed(a=None)

for i in range(int(sys.argv[1])):
    counter_try += 1
    r1 = (nennwert-toleranz) + ((toleranz*2) * random.random())
    r2 = (nennwert-toleranz) + ((toleranz*2) * random.random())
    r3 = (nennwert-toleranz) + ((toleranz*2) * random.random())
    print(r1+r2+r3)
    if ((r1 + r2 + r3) < 6.016) & ((r1 + r2 + r3) > 5.984):
        counter_hit += 1
print_result = f"Durchgänge: { counter_try } " \
               f"Treffer: { counter_hit } " \
               f"Trefferquote: { (counter_hit/counter_try)*100 }%"
print(print_result)