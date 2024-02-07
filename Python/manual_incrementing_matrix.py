def manual_incrementing_matrix(n):
    matrix = [[None for _ in range(n)] for _ in range(n)]
    counter = 1
    for idx, el in enumerate(matrix):
        for nested_idx, nested_el in enumerate(el):
            matrix[idx][nested_idx] = counter + nested_idx
        counter += 1
    return matrix


print(manual_incrementing_matrix(6))
