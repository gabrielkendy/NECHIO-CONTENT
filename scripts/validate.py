#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CONTENT STUDIO - Validador de JSON
Valida config.json e data.json

Uso: python validate.py [arquivo]
Se nenhum arquivo especificado, valida data.json
"""

import json
import sys
import os
from datetime import datetime

# Cores para terminal
class Colors:
    OK = '\033[92m'
    WARN = '\033[93m'
    ERROR = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_ok(msg):
    print(f"{Colors.OK}[OK]{Colors.RESET} {msg}")

def print_warn(msg):
    print(f"{Colors.WARN}[AVISO]{Colors.RESET} {msg}")

def print_error(msg):
    print(f"{Colors.ERROR}[ERRO]{Colors.RESET} {msg}")

def print_header(msg):
    print(f"\n{Colors.BOLD}{'='*50}{Colors.RESET}")
    print(f"{Colors.BOLD}{msg}{Colors.RESET}")
    print(f"{Colors.BOLD}{'='*50}{Colors.RESET}\n")


def validate_data_json(filepath):
    """Valida o arquivo data.json"""
    
    errors = []
    warnings = []
    
    # Carregar arquivo
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print_error(f"JSON inválido: {e}")
        return False
    except FileNotFoundError:
        print_error(f"Arquivo não encontrado: {filepath}")
        return False
    
    print_ok(f"JSON válido: {filepath}")
    
    # Validar estrutura básica
    required_keys = ['version', 'months', 'posts']
    for key in required_keys:
        if key not in data:
            errors.append(f"Campo obrigatório ausente: '{key}'")
    
    if errors:
        for e in errors:
            print_error(e)
        return False
    
    # Validar months
    months = data.get('months', [])
    if len(months) != 12:
        errors.append(f"Esperado 12 meses, encontrado {len(months)}")
    
    for i, month in enumerate(months):
        if 'id' not in month:
            errors.append(f"Mês {i+1}: campo 'id' ausente")
        elif month['id'] != i + 1:
            warnings.append(f"Mês {i+1}: id deveria ser {i+1}, é {month['id']}")
        
        if 'name' not in month:
            errors.append(f"Mês {i+1}: campo 'name' ausente")
    
    # Validar posts
    posts = data.get('posts', {})
    total_posts = 0
    
    for month_num in range(1, 13):
        key = str(month_num)
        if key not in posts:
            warnings.append(f"Mês {month_num}: array de posts não encontrado")
            continue
        
        month_posts = posts[key]
        total_posts += len(month_posts)
        
        # Validar cada post
        ids_usados = set()
        for post in month_posts:
            # ID único
            if 'id' not in post:
                errors.append(f"Mês {month_num}: post sem 'id'")
            elif post['id'] in ids_usados:
                errors.append(f"Mês {month_num}: id {post['id']} duplicado")
            else:
                ids_usados.add(post['id'])
            
            # Campos obrigatórios
            required_post_fields = ['date', 'title', 'type']
            for field in required_post_fields:
                if field not in post:
                    errors.append(f"Mês {month_num}, Post {post.get('id','?')}: '{field}' ausente")
            
            # Validar formato de data
            if 'date' in post:
                try:
                    datetime.strptime(post['date'], '%Y-%m-%d')
                except ValueError:
                    errors.append(f"Mês {month_num}, Post {post.get('id','?')}: data inválida '{post['date']}'")
            
            # Validar prioridade
            valid_priorities = ['altissima', 'alta', 'media', 'baixa']
            if 'priority' in post and post['priority'].lower() not in valid_priorities:
                warnings.append(f"Mês {month_num}, Post {post.get('id','?')}: prioridade '{post['priority']}' não padrão")
    
    # Exibir resultados
    print_header("RESULTADO DA VALIDAÇÃO")
    
    if errors:
        print_error(f"{len(errors)} erro(s) encontrado(s):")
        for e in errors:
            print(f"  • {e}")
        print()
    
    if warnings:
        print_warn(f"{len(warnings)} aviso(s):")
        for w in warnings:
            print(f"  • {w}")
        print()
    
    # Estatísticas
    print(f"Estatisticas:")
    print(f"   Meses: {len(months)}")
    print(f"   Posts total: {total_posts}")
    
    for i, month in enumerate(months):
        month_posts = len(posts.get(str(i+1), []))
        print(f"   Mês {i+1} ({month.get('name', '?')}): {month_posts} posts")
    
    if errors:
        print_error("\nValidação FALHOU")
        return False
    else:
        print_ok("\nValidação OK!")
        return True


def validate_config_json(filepath):
    """Valida o arquivo config.json"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            config = json.load(f)
    except json.JSONDecodeError as e:
        print_error(f"JSON inválido: {e}")
        return False
    except FileNotFoundError:
        print_error(f"Arquivo não encontrado: {filepath}")
        return False
    
    print_ok(f"JSON válido: {filepath}")
    
    # Verificar campos importantes
    warnings = []
    
    if 'cliente' not in config:
        warnings.append("Campo 'cliente' não encontrado")
    else:
        if config['cliente'].get('id') == 'CLIENTE_ID':
            warnings.append("cliente.id ainda não foi preenchido")
        if config['cliente'].get('nome') == 'NOME DA EMPRESA':
            warnings.append("cliente.nome ainda não foi preenchido")
    
    if 'webhook' in config:
        if config['webhook'].get('ativo') and not config['webhook'].get('url'):
            warnings.append("webhook.ativo é true mas url está vazia")
    
    if warnings:
        print_warn(f"{len(warnings)} aviso(s):")
        for w in warnings:
            print(f"  • {w}")
    else:
        print_ok("Config parece OK!")
    
    return True


def main():
    print_header("CONTENT STUDIO - VALIDADOR")
    
    # Determinar arquivo a validar
    if len(sys.argv) > 1:
        filepath = sys.argv[1]
    else:
        filepath = 'data.json'
    
    # Validar baseado no nome do arquivo
    if 'config' in filepath.lower():
        success = validate_config_json(filepath)
    else:
        success = validate_data_json(filepath)
    
    # Exit code
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
